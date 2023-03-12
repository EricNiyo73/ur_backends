/**
 * @swagger
 * definitions:
 *   News:
 *     type: object
 *     properties:
 *       newsTitle:
 *         type: string
 *         required: true
 *       newsContent:
 *         type: string
 *       newsImage:
 *         type: string
 *       category:
 *         type: string
 *         required: true
 *     required:
 *       - newsTitle
 *       - category
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       required:
 *         - NewsTitle
 *         - NewsContent
 *         - NewsImage
 *         - category
 *       properties:
 *         newsTitle:
 *           type: string
 *           example: Breaking News
 *         newsContent:
 *           type: string
 *           example: Lorem ipsum dolor sit amet.
 *         newsImage:
 *           type: string
 *           example: https://example.com/news/image.jpg
 *         category:
 *           type: string
 *           example: Politics
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2023-03-12T13:54:23.069Z"
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
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               newsImage:
 *                 type: string
 *                 format: binary
 *                 description: The image file for the news
 *               newsTitle:
 *                 type: string
 *                 required: true
 *                 description: The title of the news
 *               newsContent:
 *                 type: string
 *                 required: true
 *                 description: The content of the news
 *               category:
 *                 type: string
 *                 required: true
 *                 description: The category of the news
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
 

// ==========================get all====================

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Get all news
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: cat
 *         schema:
 *           type: string
 *         description: Category of the news
 *     responses:
 *       200:
 *         description: Returns all news
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/News'
 *       500:
 *         description: Internal server error
 */


// =======================get one=========================
/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Get a news item by ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the news item to retrieve
 *     responses:
 *       200:
 *         description: Returns the news item with the specified ID
 *         schema:
 *           $ref: '#/definitions/News'
 *       404:
 *         description: News item not found
 *       500:
 *         description: Internal server error
 */

// ==========================delete==================
/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: Delete a news item by ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the news item to delete
 *     responses:
 *       200:
 *         description: News item has been deleted
 *       404:
 *         description: News item not found
 *       500:
 *         description: Internal server error
 */
// =====================update===================

/**
 * @swagger
 * /news/{id}:
 *   put:
 *     summary: Update a news item by ID
 *     description: Update a news item by ID with optional image upload
 *     tags:
 *       - News
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the news item to update
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               newsTitle:
 *                 type: string
 *               newsContent:
 *                 type: string
 *               category:
 *                 type: string
 *               newsImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Updated news item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       '404':
 *         description: News item not found
 *       '500':
 *         description: Internal server error
 */


