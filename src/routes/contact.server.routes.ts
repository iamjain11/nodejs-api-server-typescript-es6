import { Request, Response, NextFunction } from "express";
import { ContactController } from "../controllers/contact.server.controller";

export class ContactRoutes {

    public ContactController: ContactController = new ContactController()

    public routes(app): void {

        app.route('/contact')
            .get(this.ContactController.getContacts)
            .post(this.ContactController.addNewContact);

        app.route('/contact/:contactId')
            .get(this.ContactController.getContactById)
            .put(this.ContactController.updateContact)
            .delete(this.ContactController.deleteContact)

    }
}