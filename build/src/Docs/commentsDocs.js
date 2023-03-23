/**
 * @swagger
 * /comment/addcomment/{id}/:
 *   post:
 *     summary: Add a comment to a news item
 *     tags: [comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the news item to add a comment to
 *         schema:
 *           type: string
 *       - in: body
 *         name: comment
 *         required: true
 *         description: The text of the comment to add
 *         schema:
 *           type: object
 *           required:
 *             - text
 *           properties:
 *             text:
 *               type: string
 *     responses:
 *       '201':
 *         description: The updated news item with the new comment
 *         schema:
 *           $ref: '#/definitions/News'
 *       '404':
 *         description: The news item was not found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       '500':
 *         description: An error occurred while adding the comment
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

/**
 * @swagger
 * /comment/{newsId}/{commentId}:
 *   delete:
 *     summary: Delete a comment from a news item
 *     tags: [comment]
 *     parameters:
 *       - in: path
 *         name: newsId
 *         required: true
 *         description: The ID of the news item containing the comment to delete
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: The ID of the comment to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The updated news item with the specified comment deleted
 *         schema:
 *           $ref: '#/definitions/News'
 *       '404':
 *         description: The news item or comment was not found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       '500':
 *         description: An error occurred while deleting the comment
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

/**
 * @swagger
 * /comment/count/{id}/:
 *   get:
 *     summary: Get the number of comments for a news item
 *     tags: [comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the news item to get the comment count for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The number of comments for the specified news item
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *             message:
 *               type: string
 *       '404':
 *         description: The news item was not found
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *             message:
 *               type: string
 */
"use strict";
//# sourceMappingURL=commentsDocs.js.map