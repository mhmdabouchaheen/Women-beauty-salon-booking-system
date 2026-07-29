module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/favicon.ico (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/favicon.1_82w_trsd98h.ico" + (globalThis["NEXT_CLIENT_ASSET_SUFFIX"] || ''));}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/src/app/favicon.ico (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 1203,
    height: 880
};
}),
"[project]/src/components/customer/UpcomingAppointments.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UpcomingAppointments
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
function UpcomingAppointments({ appointments }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(231,84,128,0.05)] border border-white/40",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-headline-sm text-headline-sm text-on-surface",
                        children: "Upcoming Appointments"
                    }, void 0, false, {
                        fileName: "[project]/src/components/customer/UpcomingAppointments.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/dashboard/appointments",
                        className: "font-label-md text-label-md text-primary hover:underline underline-offset-4",
                        children: "View All"
                    }, void 0, false, {
                        fileName: "[project]/src/components/customer/UpcomingAppointments.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/customer/UpcomingAppointments.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            appointments.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-8 text-center text-on-surface-variant bg-surface-container-low rounded-2xl border border-outline-variant/30",
                children: "You have no upcoming appointments yet."
            }, void 0, false, {
                fileName: "[project]/src/components/customer/UpcomingAppointments.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: appointments.map((appt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex items-center p-5 bg-surface-container-low rounded-2xl border border-outline-variant/30 hover:border-primary/30 transition-colors ${appt.past ? "opacity-70" : ""}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `w-16 h-16 rounded-xl bg-white flex flex-col items-center justify-center border border-outline-variant/50 shrink-0 ${appt.past ? "text-on-surface-variant" : "text-primary"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[12px] font-bold uppercase",
                                        children: appt.month
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/customer/UpcomingAppointments.tsx",
                                        lineNumber: 49,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[24px] font-bold leading-none",
                                        children: appt.day
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/customer/UpcomingAppointments.tsx",
                                        lineNumber: 52,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/customer/UpcomingAppointments.tsx",
                                lineNumber: 44,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ml-6 flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-label-md text-on-surface truncate",
                                        children: appt.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/customer/UpcomingAppointments.tsx",
                                        lineNumber: 58,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-on-surface-variant text-[14px]",
                                        children: [
                                            "with ",
                                            appt.specialist,
                                            " • ",
                                            appt.time
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/customer/UpcomingAppointments.tsx",
                                        lineNumber: 61,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/customer/UpcomingAppointments.tsx",
                                lineNumber: 57,
                                columnNumber: 15
                            }, this),
                            appt.action === "Reschedule" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/dashboard/appointments",
                                className: "hidden md:block px-6 py-2 border border-primary text-primary rounded-full font-label-md hover:bg-primary hover:text-white transition-all",
                                children: "Reschedule"
                            }, void 0, false, {
                                fileName: "[project]/src/components/customer/UpcomingAppointments.tsx",
                                lineNumber: 67,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/dashboard/appointments",
                                className: "hidden md:block px-6 py-2 border border-outline text-on-surface-variant rounded-full font-label-md hover:bg-on-surface-variant hover:text-white transition-all",
                                children: "Details"
                            }, void 0, false, {
                                fileName: "[project]/src/components/customer/UpcomingAppointments.tsx",
                                lineNumber: 74,
                                columnNumber: 17
                            }, this)
                        ]
                    }, appt.id, true, {
                        fileName: "[project]/src/components/customer/UpcomingAppointments.tsx",
                        lineNumber: 38,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/customer/UpcomingAppointments.tsx",
                lineNumber: 36,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/customer/UpcomingAppointments.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/customer/GoldStatusCard.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/customer/GoldStatusCard.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/customer/GoldStatusCard.tsx <module evaluation>", "default");
}),
"[project]/src/components/customer/GoldStatusCard.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/customer/GoldStatusCard.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/customer/GoldStatusCard.tsx", "default");
}),
"[project]/src/components/customer/GoldStatusCard.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$customer$2f$GoldStatusCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/customer/GoldStatusCard.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$customer$2f$GoldStatusCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/customer/GoldStatusCard.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$customer$2f$GoldStatusCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/config/salon.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SALON_NAME",
    ()=>SALON_NAME,
    "SALON_TIME_ZONE",
    ()=>SALON_TIME_ZONE
]);
const SALON_NAME = "Women Beauty Salon";
const SALON_TIME_ZONE = "Asia/Beirut";
}),
"[project]/src/models/Appointment.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const appointmentSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    userId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    serviceId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "Service",
        required: true,
        index: true
    },
    staffId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "Staff",
        required: true,
        index: true
    },
    appointmentDate: {
        type: Date,
        required: true,
        index: true
    },
    appointmentTime: {
        type: String,
        required: true,
        match: /^([01]\d|2[0-3]):[0-5]\d$/
    },
    startDateTime: {
        type: Date,
        required: true,
        index: true
    },
    endDateTime: {
        type: Date,
        required: true,
        index: true
    },
    status: {
        type: String,
        enum: [
            "booked",
            "completed",
            "cancelled"
        ],
        default: "booked",
        index: true
    },
    rewardsAwarded: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    collection: "appointments"
});
appointmentSchema.pre("validate", function validateRange() {
    if (this.endDateTime <= this.startDateTime) {
        this.invalidate("endDateTime", "endDateTime must be later than startDateTime");
    }
});
const Appointment = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Appointment ?? __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model("Appointment", appointmentSchema);
const __TURBOPACK__default__export__ = Appointment;
}),
"[project]/src/models/BookingReservation.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const bookingReservationSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    userId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    serviceId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "Service",
        required: true
    },
    staffId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "Staff",
        required: true,
        index: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    startDateTime: {
        type: Date,
        required: true,
        index: true
    },
    endDateTime: {
        type: Date,
        required: true,
        index: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    currency: {
        type: String,
        required: true,
        default: "usd"
    },
    status: {
        type: String,
        enum: [
            "pending",
            "processing",
            "completed",
            "cancelled",
            "expired"
        ],
        default: "pending",
        index: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: true
    },
    stripeSessionId: {
        type: String,
        unique: true,
        sparse: true
    },
    appointmentId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "Appointment"
    }
}, {
    timestamps: true,
    collection: "booking_reservations"
});
const BookingReservation = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.BookingReservation ?? __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model("BookingReservation", bookingReservationSchema);
const __TURBOPACK__default__export__ = BookingReservation;
}),
"[project]/src/models/Service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const serviceSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
        default: "Other"
    },
    duration: {
        type: Number,
        required: true,
        min: 1,
        validate: Number.isInteger
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        trim: true,
        default: "/window.svg"
    },
    featured: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    collection: "services"
});
const Service = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Service ?? __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model("Service", serviceSchema);
const __TURBOPACK__default__export__ = Service;
}),
"[project]/src/config/rewards.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POINTS_PER_COMPLETED_APPOINTMENT",
    ()=>POINTS_PER_COMPLETED_APPOINTMENT,
    "POINTS_PER_LEVEL",
    ()=>POINTS_PER_LEVEL,
    "REWARD_REDEMPTION_COST",
    ()=>REWARD_REDEMPTION_COST,
    "getRewardLevel",
    ()=>getRewardLevel,
    "getRewardTier",
    ()=>getRewardTier
]);
const POINTS_PER_COMPLETED_APPOINTMENT = 250;
const POINTS_PER_LEVEL = 1000;
const REWARD_REDEMPTION_COST = 1000;
function getRewardLevel(lifetimePoints) {
    return Math.floor(Math.max(0, lifetimePoints) / POINTS_PER_LEVEL) + 1;
}
function getRewardTier(level) {
    if (level >= 4) return "Platinum";
    if (level === 3) return "Gold";
    if (level === 2) return "Silver";
    return "Bronze";
}
}),
"[project]/src/lib/date-time.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSalonDateTime",
    ()=>createSalonDateTime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$salon$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/salon.ts [app-rsc] (ecmascript)");
;
function timeZoneOffset(date) {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$salon$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SALON_TIME_ZONE"],
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23"
    }).formatToParts(date);
    const values = Object.fromEntries(parts.map(({ type, value })=>[
            type,
            value
        ]));
    const zonedAsUtc = Date.UTC(Number(values.year), Number(values.month) - 1, Number(values.day), Number(values.hour), Number(values.minute), Number(values.second));
    return zonedAsUtc - date.getTime();
}
function createSalonDateTime(dateValue, time) {
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) throw new Error("Invalid appointment date");
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
        throw new Error("Appointment time must use HH:mm format");
    }
    const datePart = typeof dateValue === "string" ? dateValue.match(/^\d{4}-\d{2}-\d{2}/)?.[0] : undefined;
    const [year, month, day] = (datePart ?? date.toISOString().slice(0, 10)).split("-").map(Number);
    const [hours, minutes] = time.split(":").map(Number);
    const wallTime = Date.UTC(year, month - 1, day, hours, minutes);
    let result = new Date(wallTime - timeZoneOffset(new Date(wallTime)));
    result = new Date(wallTime - timeZoneOffset(result));
    return result;
}
}),
"[project]/src/models/Staff.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const staffSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    name: {
        type: String,
        required: true,
        trim: true
    },
    specialty: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        trim: true,
        default: "/window.svg"
    },
    active: {
        type: Boolean,
        default: true
    },
    serviceIds: {
        type: [
            {
                type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
                ref: "Service",
                required: true
            }
        ],
        default: []
    },
    weeklySchedule: {
        type: [
            {
                dayOfWeek: {
                    type: Number,
                    required: true,
                    min: 0,
                    max: 6
                },
                startTime: {
                    type: String,
                    required: true,
                    match: /^([01]\d|2[0-3]):[0-5]\d$/
                },
                endTime: {
                    type: String,
                    required: true,
                    match: /^([01]\d|2[0-3]):[0-5]\d$/
                },
                _id: false
            }
        ],
        default: [],
        validate: {
            validator: (schedule)=>schedule.every(({ startTime, endTime })=>endTime > startTime) && new Set(schedule.map(({ dayOfWeek })=>dayOfWeek)).size === schedule.length,
            message: "Working hours must be valid and weekdays must be unique"
        }
    },
    holidays: {
        type: [
            {
                date: {
                    type: String,
                    required: true,
                    match: /^\d{4}-\d{2}-\d{2}$/
                },
                reason: {
                    type: String,
                    trim: true,
                    maxlength: 200
                },
                _id: false
            }
        ],
        default: [],
        validate: {
            validator: (holidays)=>new Set(holidays.map(({ date })=>date)).size === holidays.length,
            message: "Holiday dates must be unique"
        }
    }
}, {
    timestamps: true,
    collection: "staff"
});
staffSchema.index({
    serviceIds: 1
});
const Staff = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Staff ?? __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model("Staff", staffSchema);
const __TURBOPACK__default__export__ = Staff;
}),
"[project]/src/repositories/staff.repository.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createStaff",
    ()=>createStaff,
    "deleteStaff",
    ()=>deleteStaff,
    "findStaffById",
    ()=>findStaffById,
    "getAllStaff",
    ()=>getAllStaff,
    "getStaffAvailability",
    ()=>getStaffAvailability,
    "staffProvidesService",
    ()=>staffProvidesService,
    "updateStaff",
    ()=>updateStaff
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/mongoose.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/Service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Staff$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/Staff.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$salon$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/salon.ts [app-rsc] (ecmascript)");
;
;
;
;
async function createStaff(data) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    if (data.serviceIds?.length) await validateServiceIds(data.serviceIds);
    const staff = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Staff$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].create(data);
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Staff$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findById(staff._id).populate("serviceIds").orFail();
}
async function getAllStaff() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Staff$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].find().populate("serviceIds").sort({
        name: 1
    });
}
async function findStaffById(id) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Staff$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findById(id).populate("serviceIds");
}
async function updateStaff(id, data) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    if (data.serviceIds) await validateServiceIds(data.serviceIds);
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Staff$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    }).populate("serviceIds");
}
async function deleteStaff(id) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Staff$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findByIdAndDelete(id);
}
async function validateServiceIds(serviceIds) {
    const matchingServices = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].countDocuments({
        _id: {
            $in: serviceIds
        }
    });
    if (matchingServices !== serviceIds.length) {
        throw new Error("One or more selected services were not found");
    }
}
async function staffProvidesService(staffId, serviceId) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    return Boolean(await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Staff$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].exists({
        _id: staffId,
        active: {
            $ne: false
        },
        serviceIds: serviceId
    }));
}
async function getStaffAvailability(staffId, startDateTime, endDateTime) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    const staff = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Staff$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findById(staffId).select("active weeklySchedule holidays").lean();
    if (!staff || staff.active === false) return {
        available: false,
        reason: "outside_working_hours"
    };
    const formatter = new Intl.DateTimeFormat("en-CA", {
        timeZone: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$salon$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SALON_TIME_ZONE"],
        weekday: "short",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
    });
    const startParts = Object.fromEntries(formatter.formatToParts(startDateTime).map(({ type, value })=>[
            type,
            value
        ]));
    const endParts = Object.fromEntries(formatter.formatToParts(endDateTime).map(({ type, value })=>[
            type,
            value
        ]));
    const date = `${startParts.year}-${startParts.month}-${startParts.day}`;
    if (staff.holidays.some((holiday)=>holiday.date === date)) {
        return {
            available: false,
            reason: "holiday"
        };
    }
    const weekdays = {
        Sun: 0,
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thu: 4,
        Fri: 5,
        Sat: 6
    };
    const workingHours = staff.weeklySchedule.find(({ dayOfWeek })=>dayOfWeek === weekdays[startParts.weekday]);
    const endsOnSameDay = startParts.year === endParts.year && startParts.month === endParts.month && startParts.day === endParts.day;
    const startTime = `${startParts.hour}:${startParts.minute}`;
    const endTime = `${endParts.hour}:${endParts.minute}`;
    if (!workingHours || !endsOnSameDay || startTime < workingHours.startTime || endTime > workingHours.endTime) {
        return {
            available: false,
            reason: "outside_working_hours"
        };
    }
    return {
        available: true
    };
}
}),
"[project]/src/repositories/appointment.repository.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cancelAppointment",
    ()=>cancelAppointment,
    "createAppointment",
    ()=>createAppointment,
    "deleteAppointment",
    ()=>deleteAppointment,
    "deleteAppointmentsByUser",
    ()=>deleteAppointmentsByUser,
    "findAppointmentById",
    ()=>findAppointmentById,
    "findAppointmentOwnerById",
    ()=>findAppointmentOwnerById,
    "findConflictingAppointment",
    ()=>findConflictingAppointment,
    "findCustomerConflictingAppointment",
    ()=>findCustomerConflictingAppointment,
    "getAllAppointments",
    ()=>getAllAppointments,
    "getAppointmentsByStaff",
    ()=>getAppointmentsByStaff,
    "getAppointmentsByUser",
    ()=>getAppointmentsByUser,
    "updateAppointmentStatus",
    ()=>updateAppointmentStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/mongoose.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Appointment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/Appointment.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$BookingReservation$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/BookingReservation.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/Service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$User$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/User.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$rewards$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/rewards.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$date$2d$time$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/date-time.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$repositories$2f$staff$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/repositories/staff.repository.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
function populateAppointment(query) {
    return query.populate("userId").populate("serviceId").populate("staffId");
}
async function findConflictingAppointment(staffId, startDateTime, endDateTime, excludeAppointmentId) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Appointment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findOne({
        staffId,
        status: "booked",
        startDateTime: {
            $lt: endDateTime
        },
        endDateTime: {
            $gt: startDateTime
        },
        ...excludeAppointmentId ? {
            _id: {
                $ne: excludeAppointmentId
            }
        } : {}
    });
}
async function findCustomerConflictingAppointment(userId, startDateTime, endDateTime) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Appointment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findOne({
        userId,
        status: "booked",
        startDateTime: {
            $lt: endDateTime
        },
        endDateTime: {
            $gt: startDateTime
        }
    });
}
async function createAppointment(data) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    const { reservationIdToIgnore, ...appointmentData } = data;
    const service = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findById(appointmentData.serviceId).select("duration");
    if (!service) throw new Error("Selected service was not found");
    const startDateTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$date$2d$time$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSalonDateTime"])(appointmentData.appointmentDate, appointmentData.appointmentTime);
    const endDateTime = new Date(startDateTime.getTime() + service.duration * 60_000);
    const availability = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$repositories$2f$staff$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getStaffAvailability"])(appointmentData.staffId, startDateTime, endDateTime);
    if (!availability.available) {
        throw new Error(availability.reason === "holiday" ? "The selected staff member is on holiday on this date" : "The appointment is outside the selected staff member's working hours");
    }
    const conflict = await findConflictingAppointment(appointmentData.staffId, startDateTime, endDateTime);
    if (conflict) throw new Error("The selected staff member is unavailable during this time");
    const customerConflict = await findCustomerConflictingAppointment(appointmentData.userId, startDateTime, endDateTime);
    if (customerConflict) {
        throw new Error("The selected customer already has an appointment during this time");
    }
    const reservationConflict = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$BookingReservation$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findOne({
        status: {
            $in: [
                "pending",
                "processing"
            ]
        },
        expiresAt: {
            $gt: new Date()
        },
        startDateTime: {
            $lt: endDateTime
        },
        endDateTime: {
            $gt: startDateTime
        },
        $or: [
            {
                staffId: appointmentData.staffId
            },
            {
                userId: appointmentData.userId
            }
        ],
        ...reservationIdToIgnore ? {
            _id: {
                $ne: reservationIdToIgnore
            }
        } : {}
    });
    if (reservationConflict) {
        throw new Error("This appointment time is temporarily reserved by another checkout");
    }
    const appointment = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Appointment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].create({
        ...appointmentData,
        appointmentDate: new Date(appointmentData.appointmentDate),
        startDateTime,
        endDateTime
    });
    return populateAppointment(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Appointment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findById(appointment._id)).orFail();
}
async function getAppointmentsByUser(userId) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    return populateAppointment(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Appointment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].find({
        userId
    }).sort({
        startDateTime: 1
    }));
}
async function getAppointmentsByStaff(staffId) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    return populateAppointment(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Appointment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].find({
        staffId
    }).sort({
        startDateTime: 1
    }));
}
async function getAllAppointments() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    return populateAppointment(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Appointment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].find().sort({
        startDateTime: 1
    }));
}
async function findAppointmentById(id) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    return populateAppointment(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Appointment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findById(id));
}
async function findAppointmentOwnerById(id) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Appointment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findById(id).select("userId status");
}
async function deleteAppointment(id) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Appointment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findByIdAndDelete(id);
}
async function deleteAppointmentsByUser(userId) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Appointment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].deleteMany({
        userId
    });
}
async function updateAppointmentStatus(id, status) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    if (status === "completed") {
        const newlyRewarded = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Appointment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findOneAndUpdate({
            _id: id,
            rewardsAwarded: {
                $ne: true
            }
        }, {
            $set: {
                status,
                rewardsAwarded: true
            }
        }, {
            new: true,
            runValidators: true
        });
        if (newlyRewarded) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$User$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findByIdAndUpdate(newlyRewarded.userId, {
                $inc: {
                    rewardPoints: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$rewards$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["POINTS_PER_COMPLETED_APPOINTMENT"],
                    lifetimeRewardPoints: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$rewards$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["POINTS_PER_COMPLETED_APPOINTMENT"]
                }
            });
        } else {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Appointment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findByIdAndUpdate(id, {
                status
            }, {
                runValidators: true
            });
        }
        return populateAppointment(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Appointment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findById(id));
    }
    return populateAppointment(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Appointment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findByIdAndUpdate(id, {
        status
    }, {
        new: true,
        runValidators: true
    }));
}
async function cancelAppointment(id) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    return updateAppointmentStatus(id, "cancelled");
}
}),
"[project]/src/lib/customer-dashboard.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCustomerDashboardAppointments",
    ()=>getCustomerDashboardAppointments
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$salon$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/salon.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$repositories$2f$appointment$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/repositories/appointment.repository.ts [app-rsc] (ecmascript)");
;
;
;
const dateFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$salon$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SALON_TIME_ZONE"],
    dateStyle: "medium"
});
const timeFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$salon$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SALON_TIME_ZONE"],
    hour: "numeric",
    minute: "2-digit"
});
const monthFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$salon$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SALON_TIME_ZONE"],
    month: "short"
});
const dayFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$salon$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SALON_TIME_ZONE"],
    day: "2-digit"
});
async function getCustomerDashboardAppointments(userId) {
    const appointments = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$repositories$2f$appointment$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAppointmentsByUser"])(userId);
    return appointments.map((appointment)=>({
            id: appointment._id.toString(),
            service: appointment.serviceId.name,
            specialist: appointment.staffId.name,
            startDateTime: appointment.startDateTime,
            date: dateFormatter.format(appointment.startDateTime),
            time: timeFormatter.format(appointment.startDateTime),
            month: monthFormatter.format(appointment.startDateTime).toUpperCase(),
            day: dayFormatter.format(appointment.startDateTime),
            price: appointment.serviceId.price,
            image: appointment.serviceId.image || "/window.svg",
            status: appointment.status
        }));
}
}),
"[project]/src/app/dashboard/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-grid.mjs [app-rsc] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$customer$2f$UpcomingAppointments$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/customer/UpcomingAppointments.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$customer$2f$GoldStatusCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/customer/GoldStatusCard.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$customer$2d$dashboard$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/customer-dashboard.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$repositories$2f$user$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/repositories/user.repository.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
async function DashboardPage() {
    const auth = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAuthUser"])();
    if (!auth) return null;
    const [user, appointments] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$repositories$2f$user$2e$repository$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findUserById"])(auth.userId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$customer$2d$dashboard$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCustomerDashboardAppointments"])(auth.userId)
    ]);
    if (!user) return null;
    const upcoming = appointments.filter((item)=>item.status === "booked" && item.startDateTime > new Date()).map((item)=>({
            id: item.id,
            month: item.month,
            day: item.day,
            title: item.service,
            specialist: item.specialist,
            time: item.time,
            action: "Details"
        }));
    const completed = appointments.filter((item)=>item.status === "completed").map((item)=>({
            id: item.id,
            service: item.service,
            specialist: item.specialist,
            date: item.date,
            price: item.price
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-10 flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-rose-700 to-pink-600 p-8 text-white lg:flex-row lg:items-center lg:justify-between",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"], {
                                size: 30
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl font-bold",
                                    children: [
                                        "Welcome back, ",
                                        user.name.split(" ")[0]
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 48,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-rose-100",
                                    children: "Your next moment of zen is just around the corner."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 49,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 47,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-12 grid grid-cols-1 gap-8 md:grid-cols-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-1 md:col-span-7",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$customer$2f$UpcomingAppointments$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            appointments: upcoming
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-1 md:col-span-5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$customer$2f$GoldStatusCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            points: user.rewardPoints ?? 0,
                            lifetimePoints: user.lifetimeRewardPoints ?? 0
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/app/dashboard/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/dashboard/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1b4aw5o._.js.map