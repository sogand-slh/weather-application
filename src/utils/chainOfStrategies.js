import chainReferenceProvider from "./chainReferenceProvider";

const ChainOfStrategies = class {
  /**
   * @private
   */
  static #availableOrders = ["first", "last", "all"];
  static #orderStrategies = {
    first: (chains) => [chains.find(({ condition }) => chainReferenceProvider(condition))?.handler],
    last: (chains) => [chains.findLast(({ condition }) => chainReferenceProvider(condition))?.handler],
    all: (chains) =>
      chains.reduce(
        (acc, { condition, handler }) => (chainReferenceProvider(condition) ? [...acc, handler] : acc),
        [],
      ),
  };

  /**
   * Creates a chain node.
   * @param {Boolean} condition - The condition for the chain node.
   * @param {Function} handler - The handler function.
   * @returns {object} The created chain node.
   */
  static createChainNode = (condition, handler) => ({
    condition,
    handler,
  });

  /**
   * Constructs a ChainOfStrategies instance.
   * @param {Array} chains - An array of chains.
   * @param {string} order - The order type ('first', 'last', or 'all').
   */
  constructor(chains = [], order = "all") {
    if (!ChainOfStrategies.#availableOrders.includes(order)) throw new Error("order is inValid!");

    this.chains = chains;
    this.order = order;
  }

  /**
   * Gets the execution handlers based on the order.
   * @private
   * @returns {Array<Function>|null} An array of execution handlers or null.
   */
  #getExecutionHandlers() {
    const executionHandlers = ChainOfStrategies.#orderStrategies[this.order](this.chains);
    const isHandlersExecutable = executionHandlers?.length && executionHandlers.at(0);

    return isHandlersExecutable && executionHandlers;
  }

  /**
   * Reduces the payload using the execution handlers.
   * @param {any} payload - The payload to reduce.
   * @returns {any} The reduced payload.
   */
  reduce(payload) {
    const reduceHandlers = this.#getExecutionHandlers();
    if (!reduceHandlers) return payload;

    return reduceHandlers.reduce((acc, handler) => acc.filter(handler), payload);
  }

  /**
   * Executes the payload using the execution handlers.
   * @param {any} [payload] - The payload to execute.
   * @returns {any} The execution value.
   */
  execute(payload) {
    const executionHandlers = this.#getExecutionHandlers();
    if (!executionHandlers) return;

    for (const handler of executionHandlers) {
      const executionValue = handler(payload);
      if (executionValue) return executionValue;
    }
  }

  /**
   * Asynchronously executes the payload using the execution handlers.
   * @param {any} [payload] - The payload to execute asynchronously.
   * @returns {Promise<Array|null>} A promise resolving to an array of execution values or null.
   */
  asyncExecute(payload) {
    const executionHandlers = this.#getExecutionHandlers();
    if (!executionHandlers) return Promise.resolve(null);

    return Promise.all(executionHandlers.map((handler) => handler(payload)));
  }
};

export default ChainOfStrategies;
