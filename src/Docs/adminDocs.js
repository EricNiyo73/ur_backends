/**
 * @swagger
 * admin/create:
 *   post:
 *     summary: Create a new facility
 *     description: |
 *       This endpoint creates a new facility with the specified facility name, sub-facility names, description, and image file.
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file for the facility
 *               facilityname:
 *                 type: string
 *                 description: The name of the facility
 *               sub:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of sub-facility names
 *               desc:
 *                 type: string
 *                 description: A description of the facility
 *     responses:
 *       '201':
 *         description: Facility created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusbar:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "facility created successfully"
 *                 facility:
 *                   $ref: '#/components/schemas/Facility'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error creating facility"
 * components:
 *   schemas:
 *     Facility:
 *       type: object
 *       properties:
 *         facilityname:
 *           type: string
 *         sub:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               sub:
 *                 type: string
 *         desc:
 *           type: string
 *         image:
 *           type: string
 *           format: uri
 *           description: URL of the image file uploaded to Cloudinary
 *       example:
 *         facilityname: Basketball Court
 *         sub:
 *           - sub: Half-court
 *           - sub: Full-court
 *         desc: A court for playing basketball
 *         image: https://res.cloudinary.com/demo/image/upload/v1234567890/sample.jpg
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

// ===================get one=======================
/**
 * @swagger
 * /admin/{id}:
 *   get:
 *     summary: Get a facility by id
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Facility id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Facility'
 *       '404':
 *         description: Facility not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


// ==========================delete=====================

/**
 * @swagger
 * /admin/{id}:
 *   delete:
 *     summary: Delete a facility by id
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Facility id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Facility deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Facility has been deleted.
 *       '404':
 *         description: Facility not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


// ====================================================================

/**
 * @swagger
 * components:
 *   schemas:
 *     SubFacility:
 *       type: object
 *       required:
 *         - facility_number
 *         - capacity
 *       properties:
 *         facility_number:
 *           type: string
 *           description: Number of the sub-facility
 *         capacity:
 *           type: integer
 *           description: Capacity of the sub-facility
 *       example:
 *         facility_number: Lab 1
 *         capacity: 4
 *
 *     Facility:
 *       type: object
 *       required:
 *         - facilityname
 *         - subFacility
 *         - desc
 *         - image
 *       properties:
 *         facilityname:
 *           type: string
 *           description: Name of the facility
 *         subFacility:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SubFacility'
 *         desc:
 *           type: string
 *           description: Description of the facility
 *         image:
 *           type: string
 *           format: binary
 *           description: Image of the facility
 *       example:
 *         facilityname: Tennis Lab
 *         subFacility:
 *           - facility_number: Lab 1
 *             capacity: 4
 *           - facility_number: Lab 2
 *             capacity: 4
 *         desc: Outdoor tennis Lab for all ages
 *
 * /admin/{id}:
 *   put:
 *     summary: Update a facility
 *     tags: [Admin]
 *     description: Update a facility by ID using the request body
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the facility to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               facility:
 *                 $ref: '#/components/schemas/Facility'
 *               image:
 *                 type: string
 *                 format: binary
 *           encoding:
 *             image:
 *               contentType: image/jpeg
 *     responses:
 *       '200':
 *         description: Facility successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Facility'
 *       '404':
 *         description: Facility not found
 *       '500':
 *         description: Internal server error
 */







// ===============================changing a role========================

/**
 * @swagger
 * /admin/Role/{id}:
 *   patch:
 *     summary: Update the role of a user by ID
 *     description: Update the role of a user by ID. Only "user" and "leader" roles are allowed.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to update.
 *       - in: body
 *         name: role
 *         schema:
 *           type: object
 *           properties:
 *             role:
 *               type: string
 *               enum: ["user", "leader"]
 *         required: true
 *         description: The new role to assign to the user.
 *     responses:
 *       200:
 *         description: Successfully updated the role of the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the role was updated successfully.
 *       400:
 *         description: Invalid role specified in the request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the specified role is invalid.
 *       404:
 *         description: User with specified ID not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the user with the specified ID was not found.
 *       500:
 *         description: Failed to update the user's role.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the update failed due to an internal server error.
 */
