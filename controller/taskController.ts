import {Request, Response} from "express";
import Project from '../models/Project';
import Task from "../models/Task";

export const createTask = async(req: Request, res: Response): Promise<any> => {
    try{
        const {projectId, title, dueDate} = req.body;

          if (!title){
            return res.status(400).json({
                message: 'title are required'
            })
        }
        const ProjectExist = await Project.findById(projectId);
        if (!ProjectExist){
            return res.status(404).json({
                message: 'Project not found'
            })
        }

        const task = new Task ({projectId, title, dueDate });
        const savedTask = await task.save();
        res.status(201).json({
            message:'Task created successfully',
            post: savedTask})
        }
        catch (error: any){
            return res.status(500).json({
                message: 'Error creating Task',
            })
}}

export const getAllTask = async(req: Request, res:Response) => {
    try{
        const task = await Task.find().populate('projectId','name description');
        res.status(200).json(task)
    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}

export const getTaskById = async(req: Request, res:Response) => {
    try{
        const task = await Task.findById(req.params.id).populate('projectId','name description');
        res.status(200).json(task)
    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}

export const updateTask = async (req: Request, res:Response): Promise<any> =>{
    try{
        const updates = req.body
        const {id} = req.params
        const updatedtask = await Task.findByIdAndUpdate(id, updates, {new: true});

        if(!updatedtask){
            return res.status(404).json({message: 'Task not found'})
        }
        res.status(200).json(updateTask)
    }catch (error: any){    
        res.status(500).json({message: error.message})
    }
}

export const delateTask = async (req: Request, res:Response): Promise<any> =>{
    try {
        const {id} = req.params
        const deletetask = await Task.findByIdAndDelete(id);

        if(!deletetask){    
            return res.status(404).json({message: 'Task not found'})
        }
        res.status(200).json(deletetask)
    }catch (error: any){
        res.status(500).json({message: error.message})
    }
}