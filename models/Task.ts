import {Schema, model, Document} from 'mongoose';

// Définir une interface
interface ITask extends Document{
    projectId: Schema.Types.ObjectId;
    title:  string;
    done: boolean;
    dueDate: Date
}

//Définir notre schéma 
const taskSchema = new Schema<ITask> ({
    projectId:{type: Schema.Types.ObjectId, ref: 'Project',required: true },
    title:{type: String, required: true},
    done: {type: Boolean, default: false, required: false},
    dueDate: {type: Date, required: false}
})

taskSchema.index({title: "text"})

const Task = model<ITask>('Task', taskSchema);  

export default Task; 