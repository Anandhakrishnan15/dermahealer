import jsPDF from "jspdf";

import {
    format,
    isToday,
    parseISO,
} from "date-fns";

export function downloadTodayPDF(appointments) {

    const doc = new jsPDF();

    // ---------------------------------------------------------
    // FILTER TODAY + PAID
    // ---------------------------------------------------------
    const todayAppointments = appointments.filter(
        (appt) =>
            isToday(parseISO(appt.date)) &&
            appt.paymentDone
    );

    let y = 20;

    // ---------------------------------------------------------
    // HEADER BRAND
    // ---------------------------------------------------------
    doc.setFontSize(22);

    doc.setFont("helvetica", "bold");

    const text1 = "Derma ";
    const text2 = "Healer";

    const pageWidth =
        doc.internal.pageSize.getWidth();

    const text1Width =
        doc.getTextWidth(text1);

    const text2Width =
        doc.getTextWidth(text2);

    const totalWidth =
        text1Width + text2Width;

    const startX =
        (pageWidth - totalWidth) / 2;

    // DERMA RED
    doc.setTextColor(220, 0, 0);

    doc.text(
        text1,
        startX,
        y
    );

    // HEALER GREEN
    doc.setTextColor(0, 150, 0);

    doc.text(
        text2,
        startX + text1Width,
        y
    );

    // RESET
    doc.setTextColor(0, 0, 0);

    doc.setFont("helvetica", "normal");

    // ---------------------------------------------------------
    // REPORT TITLE
    // ---------------------------------------------------------
    y += 12;

    doc.setFontSize(14);

    doc.setFont("helvetica", "bold");

    doc.text(
        "Today's Appointments",
        105,
        y,
        {
            align: "center",
        }
    );

    // RESET
    doc.setFont("helvetica", "normal");

    // ---------------------------------------------------------
    // DATE + TIME
    // ---------------------------------------------------------
    y += 10;

    const now = new Date();

    doc.setFontSize(10);

    doc.setTextColor(80, 80, 80);

    doc.text(
        `Date: ${format(
            now,
            "dd MMM yyyy"
        )}`,
        20,
        y
    );

    doc.text(
        `Generated: ${format(
            now,
            "hh:mm a"
        )}`,
        145,
        y
    );

    // ---------------------------------------------------------
    // DIVIDER
    // ---------------------------------------------------------
    y += 6;

    doc.setDrawColor(180);

    doc.line(20, y, 190, y);

    // ---------------------------------------------------------
    // TABLE HEADER
    // ---------------------------------------------------------
    y += 10;

    doc.setFontSize(11);

    doc.setFont("helvetica", "bold");

    doc.setTextColor(0, 0, 0);

    doc.text("No", 20, y);

    doc.text("Patient Name", 30, y);

    doc.text("Phone", 85, y);

    doc.text("Doctor", 125, y);

    doc.text("Time", 165, y);

    // HEADER LINE
    y += 5;

    doc.setDrawColor(120);

    doc.line(20, y, 190, y);

    // ---------------------------------------------------------
    // TABLE DATA
    // ---------------------------------------------------------
    y += 8;

    doc.setFont("helvetica", "normal");

    doc.setTextColor(40, 40, 40);

    if (todayAppointments.length === 0) {

        doc.text(
            "No appointments today.",
            22,
            y
        );

    } else {

        todayAppointments.forEach(
            (appt, index) => {

                // PAGE BREAK
                if (y > 270) {

                    doc.addPage();

                    y = 20;

                    // REPEAT TABLE HEADER
                    doc.setFont(
                        "helvetica",
                        "bold"
                    );

                    doc.text("No", 20, y);

                    doc.text(
                        "Patient Name",
                        30,
                        y
                    );

                    doc.text(
                        "Phone",
                        85,
                        y
                    );

                    doc.text(
                        "Doctor",
                        125,
                        y
                    );

                    doc.text(
                        "Time",
                        165,
                        y
                    );

                    y += 5;

                    doc.line(20, y, 190, y);

                    y += 8;

                    doc.setFont(
                        "helvetica",
                        "normal"
                    );
                }

                doc.text(
                    String(index + 1),
                    20,
                    y
                );

                doc.text(
                    appt.name || "-",
                    30,
                    y
                );

                doc.text(
                    appt.phone || "-",
                    85,
                    y
                );

                doc.text(
                    appt.doctor || "-",
                    125,
                    y
                );

                doc.text(
                    appt.time || "-",
                    165,
                    y
                );

                y += 8;
            }
        );
    }

    // ---------------------------------------------------------
    // TOTAL COUNT
    // ---------------------------------------------------------
    y += 8;

    doc.setDrawColor(180);

    doc.line(20, y, 190, y);

    y += 10;

    doc.setFont("helvetica", "bold");

    doc.setFontSize(12);

    doc.setTextColor(0, 0, 0);

    doc.text(
        `Total Patients: ${todayAppointments.length}`,
        20,
        y
    );

    // ---------------------------------------------------------
    // FOOTER
    // ---------------------------------------------------------
    y += 20;

    doc.setFont("helvetica", "normal");

    doc.setFontSize(10);

    doc.setTextColor(100, 100, 100);

    doc.text(
        "Thank you for choosing Derma Healer",
        105,
        y,
        {
            align: "center",
        }
    );

    y += 6;

    doc.text(
        "This is a system-generated report",
        105,
        y,
        {
            align: "center",
        }
    );

    // ---------------------------------------------------------
    // SAVE PDF
    // ---------------------------------------------------------
    const fileDate = format(
        new Date(),
        "yyyy-MM-dd"
    );

    doc.save(
        `derma-healer-${fileDate}.pdf`
    );
}