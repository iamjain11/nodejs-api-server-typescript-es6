import { Contact } from "../models/contact.models";
import { Request, Response } from 'express';
import { basename } from "path";
import { APILogger } from "../utilities/logger.util";
let logger = new APILogger().initLogger(basename(__filename))

export class ContactController {

    public addNewContact(req: Request, res: Response): void {
        let newContact = new Contact(req.body);

        newContact.getFullName();

        newContact.save((err, contact) => {
            if (err) {
                logger.error('addNewContact method has error : ', err);
                return res.send(err);
            } else {
                logger.info('addNewContact method executed successfully ');
                return res.json(contact);
            }
        });
    }

    public getContacts(req: Request, res: Response): void {
        Contact.find({}, (err, contact) => {
            if (err) {
                logger.error('getContacts method has error : ', err);
                res.send(err);
            } else {
                logger.info('getContacts method executed successfully ');
                res.json(contact);
            }
        });
    }

    public getContactById(req: Request, res: Response): void {
        Contact.findById(req.params.contactId, (err, contact) => {
            if (err) {
                logger.error('getContactById method has error : ', err);
                res.send(err);
            } else {
                logger.info('getContactById method executed successfully ');
                if (!contact) {
                    return res.json({ status: 404, message: 'contact not found' });
                }
                res.json(contact);
            }
        });
    }

    public updateContact(req: Request, res: Response): void {
        Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
            if (err) {
                logger.error('updateContact method has error : ', err);
                res.send(err);
            } else {
                logger.info('updateContact method executed successfully ');
                res.json(contact);
            }
        });
    }

    public deleteContact(req: Request, res: Response): void {
        Contact.remove({ _id: req.params.contactId }, (err) => {
            if (err) {
                logger.error('deleteContact method has error : ', err);
                res.send(err);
            } else {
                logger.info('deleteContact method executed successfully ');
                res.json({ message: 'Successfully deleted contact!' });
            }
        });
    }

}