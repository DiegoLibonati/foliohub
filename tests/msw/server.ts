import { setupServer } from "msw/node";
import {
  DefaultBodyType,
  http,
  HttpResponse,
  RequestHandler,
  StrictRequest,
} from "msw";

type HandleConfig = {
  path: string;
  method: "get" | "post" | "delete" | "patch";
  res: ({
    request,
  }: {
    request: StrictRequest<DefaultBodyType>;
  }) => Record<string, unknown> | Record<string, unknown>[];
};

export const createServer = (handlerConfig: HandleConfig[]): void => {
  const handlers: RequestHandler[] = handlerConfig.map((handleConfig) => {
    return http[handleConfig.method](handleConfig.path, ({ request }) => {
      return HttpResponse.json(handleConfig.res({ request: request }));
    });
  });

  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });
};
