import { createFederation } from "@fedify/fedify";
import { Person } from "@fedify/vocab";
import { getLogger } from "@logtape/logtape";
import { InProcessMessageQueue, MemoryKvStore } from "@fedify/fedify";

const logger = getLogger("threadiverse");

const federation = createFederation({
  kv: new MemoryKvStore(),
  queue: new InProcessMessageQueue(),
});

federation.setActorDispatcher("/users/{identifier}", async (ctx, identifier) => {
  logger.info("Dispatching actor {identifier}", { identifier });
  return new Person({
    id: ctx.getActorUri(identifier),
    preferredUsername: identifier,
    name: identifier,
  });
});

export default federation;
