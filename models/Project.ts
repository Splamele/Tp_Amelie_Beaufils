import {Schema, model, Document} from 'mongoose';

// Définir une interface
interface IProject extends Document{
    name: string;
    description: string;
    status: string;
    createAt: Date;
}

//Définir notre schéma 
const projectSchema = new Schema<IProject>({
    name: {type: String, required: true},
    description: {type: String, required: false},
    status: {type: String,
        enum: ['planned', 'in-progress', 'completed'],
        default: 'planned'
     },
     createAt: {type: Date, default: Date.now}
})

projectSchema.index({name: "text", description:"text"})

const Project = model<IProject>('Project', projectSchema);

export default Project;