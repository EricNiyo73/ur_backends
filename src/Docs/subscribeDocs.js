/**
 * @swagger
 * tags:
 *   name: Subscribe
 *   description: Subscription API
 */

/**
 * @swagger
 * definitions:
 *   Subscriber:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *   SubscribeResponse:
 *     type: object
 *     properties:
 *       subscri:
 *         $ref: '#/definitions/Subscriber'
 *       status:
 *         type: string
 *   ErrorResponse:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 */

/**
 * @swagger
 * /subscribe/addsubscribe:
 *   post:
 *     tags: [Subscribe]
 *     summary: Subscribe to the service
 *     description: Endpoint for creating a new subscription
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Subscriber'
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           $ref: '#/definitions/SubscribeResponse'
 *       400:
 *         description: Bad request
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */

// ========================================================
/**
 * @swagger
 * /subscribe/{id}:
 *   delete:
 *     tags: [Subscribe]
 *     summary: Unsubscribe from the service
 *     description: Endpoint for unsubscribing from the service
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the subscription to unsubscribe
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "you have successfully unsubscribed"
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */

// =============================================================
/**
 * @swagger
 * /subscribe:
 *   get:
 *     tags: [Subscribe]
 *     summary: Get all subscribers
 *     description: Endpoint for getting all the subscribers
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Subscriber'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */