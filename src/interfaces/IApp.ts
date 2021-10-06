import express from 'express';

export interface IApp {
  app: express.Application;
  port: number;
  listen(): void;
}
