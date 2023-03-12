/**
 * @swagger
 * /admin/booking-requests/{id}:
 *   patch:
 *     summary: Approve or reject a booking request
 *     tags: [Admin]
 *     description: This endpoint is used by administrators to approve or reject a booking request. An email notification will be sent to the user whose booking request was approved or rejected.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the booking request to be approved or rejected
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The approval status of the booking request and optional message for rejected request
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Approved, Rejected]
 *                 description: The status to approve or reject the booking request
 *     responses:
 *       '200':
 *         description: Booking request approved or rejected successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '400':
 *         description: Invalid booking request status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message indicating that the booking request status is invalid
 *       '404':
 *         description: Booking request not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '500':
 *         description: Failed to update booking request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message indicating that the booking request failed to update
 */
"use strict";
//# sourceMappingURL=adminApproveReject.js.map