/**
 * @swagger
 * definitions:
 *   News:
 *     type: object
 *     required:
 *       - newsTitle
 *       - category
 *     properties:
 *       newsTitle:
 *         type: string
 *         example: Breaking News
 *       newsContent:
 *         type: string
 *         example: Lorem ipsum dolor sit amet.
 *       newsImage:
 *         type: string
 *         example: https://example.com/news/image.jpg
 *       category:
 *         type: string
 *         example: Politics
 *       date:
 *         type: string
 *         format: date-time
 *         example: "2023-03-12T13:54:23.069Z"
 */

// ========================create==================================

/**
 * @swagger
 * /news/create:
 *   post:
 *     summary: Create a new news
 *     tags: [News]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: newsImage
 *         type: file
 *         description: The image file for the news
 *       - in: formData
 *         name: newsTitle
 *         type: string
 *         required: true
 *         description: The title of the news
 *       - in: formData
 *         name: newsContent
 *         type: string
 *         required: true
 *         description: The content of the news
 *       - in: formData
 *         name: category
 *         type: string
 *         required: true
 *         description: The category of the news
 *     responses:
 *       200:
 *         description: Returns the created news
 *         schema:
 *           $ref: '#/definitions/News'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
"use strict";
//# sourceMappingURL=newsDocs.js.map