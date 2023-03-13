/**
 * @swagger
 * components:
 *   schemas:
 *     Facility:
 *       type: object
 *       required:
 *         - facilityname
 *         - subFacility
 *         - desc
 *         - image
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the facility.
 *         facilityname:
 *           type: string
 *           description: The name of the facility.
 *         subFacility:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               facility_number:
 *                 type: string
 *                 description: The number of the sub-facility.
 *               capacity:
 *                 type: number
 *                 description: The capacity of the sub-facility.
 *         desc:
 *           type: string
 *           description: The description of the facility.
 *         image:
 *           type: string
 *           description: The URL of the image of the facility.
 */


/**
 * @swagger
 * /admin/create:
 *   post:
 *     summary:  create a new facility
 *     description: Creation of a new facility and upload an images of that
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               facility:
 *                 type: object
 *                 description: The facility object.
 *                 properties:
 *                   facilityname:
 *                     type: string
 *                     description: The name of the facility.
 *                   subFacility:
 *                     type: array
 *                     description: An array of sub-facilities.
 *                     items:
 *                       type: object
 *                       properties:
 *                         facility_number:
 *                           type: string
 *                           description: The unique number of the sub-facility.
 *                         capacity:
 *                           type: number
 *                           description: The capacity of the sub-facility.
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
