
import { Document, Schema, Model, model } from "mongoose";
import { IContact } from "../interfaces/contact";

export interface IContactModel extends IContact, Document {
    getFullName(): string;
}

export var ContactSchema: Schema = new Schema(
    {
        email: String,
        firstName: String,
        lastName: String,
        contactId: String,
        fullName: String
    },
    {
        timestamps: true
    }
);

ContactSchema.pre<IContactModel>("save", function (next) {
    this.contactId = this._id;
    next();
});
ContactSchema.methods.getFullName = function (): void {
    this.fullName = (this.firstName.trim() + " " + this.lastName.trim());
};

export const Contact: Model<IContactModel> = model<IContactModel>("Contact", ContactSchema);
