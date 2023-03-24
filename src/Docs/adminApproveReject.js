/**
 * @swagger
 * /admin/booking/rejecting/{id}:
 *   patch:
 *     summary: Reject a booking request.
 *     tags: [request]
 *     description: Use this endpoint to reject a booking request.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the booking request to reject.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The request body should contain the rejection status and reason.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - Rejected
 *                 description: The status to set for the booking request.
 *               rejectionReason:
 *                 type: string
 *                 description: The reason for rejecting the booking request.
 *     responses:
 *       '200':
 *         description: Booking request rejected successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The success message.
 *       '400':
 *         description: Invalid status or rejection reason not provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *       '404':
 *         description: Booking request not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *       '500':
 *         description: Failed to update booking request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 */

/**
 * @swagger
 * /admin/booking/approving/{id}:
 *   patch:
 *     summary: Approve a booking request.
 *     tags: [request]
 *     description: Use this endpoint to approve a booking request.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the booking request to approve.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The request body should contain the approval status.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - Approved
 *                 description: The status to set for the booking request.
 *     responses:
 *       '200':
 *         description: Booking request approved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The success message.
 *       '400':
 *         description: Invalid status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *       '404':
 *         description: Booking request not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *       '500':
 *         description: Failed to update booking request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 */
