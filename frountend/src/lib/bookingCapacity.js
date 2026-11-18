export const BOOKING_DOCTORS = ["Dr. B.K. Sharma", "Dr. Neha Rani"];

export const BOOKING_TIMES = [
  "08:30-09:30",
  "10:30-11:30",
  "11:30-12:30",
  "12:30-01:30",
];

export const MAX_PER_SLOT = 5;
export const MAX_PER_DAY = BOOKING_TIMES.length * MAX_PER_SLOT;
export const RESERVATION_HOLD_MS = 10 * 60 * 1000;

export function getActiveBookingFilter(now = new Date()) {
  const legacyReservationCutoff = new Date(
    now.getTime() - RESERVATION_HOLD_MS,
  );

  return {
    $or: [
      { paid: true },
      {
        capacitySeat: { $type: "number" },
        reservationExpiresAt: { $gt: now },
      },
      {
        capacitySeat: { $exists: false },
        paid: { $ne: true },
        paymentStatus: { $in: ["PENDING", null] },
        createdAt: { $gt: legacyReservationCutoff },
      },
    ],
  };
}
