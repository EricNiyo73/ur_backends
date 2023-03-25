/**
 * @swagger
 * components:
 *   schemas:
 *     bookAdmin:
 *       type: object
 *       properties:
 *         facilityname:
 *           type: string
 *           description: The name of the facility.
 *           required: true
 *           unique: true
 *         category:
 *           type: string
 *           description: The category of the facility.
 *           required: true
 *         desc:
 *           type: string
 *           description: The description of the facility.
 *           default: "No description"
 *         image:
 *           type: array
 *           items:
 *             type: string
 *           description: The image files for the facility.
 *         contactPersonName:
 *           type: string
 *           description: The name of the contact person for the facility.
 *           required: true
 *         maxcapacity:
 *           type: number
 *           description: The maximum capacity of the facility.
 *           required: true
 *         managerId:
 */

/**
 * @swagger
 * /admin/create:
 *   post:
 *     summary: Creates a new facility.
 *     tags: [Facility]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               facilityname:
 *                 type: string
 *                 description: The name of the facility.
 *               maxcapacity:
 *                 type: number
 *                 description: The maximum capacity of the facility.
 *               desc:
 *                 type: string
 *                 description: The description of the facility.
 *               contactPersonName:
 *                 type: string
 *                 description: The name of the contact person for the facility.
 *               category:
 *                 type: string
 *                 description: The category of the facility.
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file for the facility.
 *     responses:
 *       201:
 *         description: Facility created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusbar:
 *                   type: string
 *                   description: The status of the response.
 *                 message:
 *                   type: string
 *                   description: A message describing the result of the request.
 *                 facility:
 *                   type: object
 *                   properties:
 *                     facilityname:
 *                       type: string
 *                       description: The name of the facility.
 *                     maxcapacity:
 *                       type: number
 *                       description: The maximum capacity of the facility.
 *                     desc:
 *                       type: string
 *                       description: The description of the facility.
 *                     contactPersonName:
 *                       type: string
 *                       description: The name of the contact person for the facility.
 *                     category:
 *                       type: string
 *                       description: The category of the facility.
 *                     managerId:
 *                       type: string
 *                       description: The ID of the manager who created the facility.
 *                     image:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: binary
 *                         description: The image file for the facility.
 *       400:
 *         description: Invalid request body.
 *       500:
 *         description: Failed to create facility.
 */

// ===================get all====================
/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Retrieve all facilities
 *     tags: [Facility]
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
 *       - Facility
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
 *       - Facility
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

// ===============================changing a role========================

/**
 * @swagger
 * /admin/Role/{id}:
 *   patch:
 *     summary: Update the role of a user by ID
 *     description: Update the role of a user by ID. Only "user" and "leader" roles are allowed.
 *     tags:
 *       - Facility
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
