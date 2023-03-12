/**
 * @swagger
 * /admin/create:
 *   post:
 *     summary: Create a new facility
 *     description: Uploads an image to Cloudinary and creates a new facility in the database.
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               facilityTitle:
 *                 type: string
 *                 description: The title of the facility.
 *               subFacility:
 *                 type: array
 *                 description: An array of sub-facilities.
 *                 items:
 *                   type: object
 *                   properties:
 *                     facility_number:
 *                       type: string
 *                       description: The title of the sub-facility.
 *                     capacity:
 *                       type: number
 *                       description: The capacity of the sub-facility.
 *               desc:
 *                 type: string
 *                 description: The description of the facility.
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload.
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 */
// ===================get all====================
/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Retrieve all facilities
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: A list of facilities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *         description: Internal server error
 */
"use strict";
//# sourceMappingURL=adminDocs.js.map