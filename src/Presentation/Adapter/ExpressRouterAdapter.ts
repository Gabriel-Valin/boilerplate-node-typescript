import { Controller } from "@/Presentation/Protocol/Controller"
import { RequestHandler, Request, Response } from "express"

type Adapter = (controller: Controller) => RequestHandler

export const adaptExpressRoute: Adapter =
  (controller) => async (req: Request, res: Response) => {
    const { statusCode, data } = await controller.handle({
      ...req.body,
      ...req.headers,
      ...req.params,
      ...req.query,
    })
    const json = [200, 201].includes(statusCode)
      ? data
      : { error: data?.message }

    res.status(statusCode).json(json)
  }
