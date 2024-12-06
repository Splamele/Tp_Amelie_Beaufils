import {Request, Response} from "express";
import Project from '../models/Project';

export const createProject = async (req: Request, res: Response): Promise<any> =>{
    try {
        const {name, description} = req.body;

        if (!name){
            return res.status(400).json({
                message: 'name required'
            })
        
        }
        const newProject = new Project({name, description});
        const savedProject = await newProject.save();
        res.status(201).json({
            message: 'Project created successfully',
            Proe: savedProject})
        }
        catch(error: any){
            res.status(500).json({message: error.message})
        }
}

export const getAllProject = async(req: Request, res: Response) =>{
    try {
        const project = await Project.find();
        res.status(200).json(project)
    }catch (error: any ){
        res.status(500).json({message: error.message})
}}

export const getProjectById = async(req: Request, res:Response)=> {
    try{
        const project = await Project.findById(req.params.id);
        res.status(200).json(project)
    } catch (error: any){
        res.status(404).json({message: error.message})
    }
}

export const updateProject = async(req: Request, res:Response): Promise<any> =>{
    try {
        const updates = req.body
        const{id} = req.params
        const project = await Project.findByIdAndUpdate(id, updates, {new: true});
        
        if(!project){
            return res.status(404).json({message: 'Project not found'})
        }
        res.status(200).json({message: 'Project updated successfully', project: project})
    }catch (error: any){
        res.status(500).json({message: error.message})
    }
    
}
export const delateProject = async (req: Request, res:Response): Promise<any> =>{
    try {
        const {id} = req.params
        const project = await Project.findByIdAndDelete(id);

        if(!project){
            return res.status(404).json({message: 'Project not found'})
        }
        res.status(200).json({message: 'Project deleted successfully', project: project})
    }catch (error: any){
        res.status(500).json({message: error.message})
    }
}

export const completeProject = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        // Rechercher et mettre à jour le statut du projet
        const project = await Project.findByIdAndUpdate(
            id,
            { status: 'completed' },
            { new: true }
        );

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json({
            message: 'Project marked as completed',
            project,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
export const getProjectsByStatus = async (req: Request, res: Response): Promise<any> => {
    try {
        const { status } = req.query;

        const validStatuses = ['planned', 'in-progress', 'completed'];
        if (!status || !validStatuses.includes(status as string)) {
            return res.status(400).json({
                message: `Invalid status. Valid statuses are: ${validStatuses.join(', ')}`,
            });
        }
                       
        const projects = await Project.find({ status });

        res.status(200).json(projects);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
