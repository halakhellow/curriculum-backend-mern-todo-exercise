import Todo from "../../models/todo";

import { Request, Response } from "express";
import { IUser } from "../../models/user";

import { IncomingHttpStatusHeader } from "http2";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
const getTodos = async (req: Request, res: Response) => {
  // TODO: use query params to filter todos where {status: true}
  try {
    const todos = await Todo.find({ status: true });
    res.status(200).json({ todos });
  } catch (error) {
    throw error;
  }
};

const addTodo = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const todo = new Todo({
      name: body.name,
      description: body.description,
      status: body.status,
      user: req.user._id,
    });

    const newTodo = await todo.save();

    res.status(201).json({ message: "Todo added", todo: newTodo });
  } catch (error) {
    throw error;
  }
};

const updateTodo = async (req: Request, res: Response) => {
  //TODO: make sure users can't update other users todos.
  const userTodo = await Todo.find({ user: req.user._id });
  if (userTodo) {
    try {
      const {
        params: { id },
        body,
      } = req;
      const updateTodo = await Todo.findByIdAndUpdate({ _id: id }, body);
      res.status(200).json({
        message: "Todo updated",
        todo: updateTodo,
      });
    } catch (error) {
      throw error;
    }
  } else res.json({ error: "You're not authorized to update this todo" });
};

const deleteTodo = async (req: Request, res: Response) => {
  //TODO: make sure users can't delete other users todos.
  const userTodo = await Todo.find({ user: req.user._id });
  if (userTodo) {
    try {
      const deletedTodo = await Todo.findByIdAndRemove(req.params.id);
      res.status(200).json({
        message: "Todo deleted",
        todo: deletedTodo,
      });
    } catch (error) {
      throw error;
    }
  } else res.json({ error: "You're not authorized to delete this todo" });
};

export { getTodos, addTodo, updateTodo, deleteTodo };
