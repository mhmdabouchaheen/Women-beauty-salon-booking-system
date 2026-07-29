module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/api.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "serverError",
    ()=>serverError,
    "validationError",
    ()=>validationError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
function validationError(error) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: false,
        message: "Request validation failed",
        errors: error.issues.map((issue)=>({
                path: issue.path.join("."),
                message: issue.message
            }))
    }, {
        status: 400
    });
}
function serverError(context, error) {
    console.error(context, error);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: false,
        message: "An unexpected server error occurred."
    }, {
        status: 500
    });
}
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/src/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AUTH_COOKIE_NAME",
    ()=>AUTH_COOKIE_NAME,
    "assertAuthConfigured",
    ()=>assertAuthConfigured,
    "authCookieOptions",
    ()=>authCookieOptions,
    "createAuthToken",
    ()=>createAuthToken,
    "getAuthUser",
    ()=>getAuthUser,
    "verifyAuthToken",
    ()=>verifyAuthToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
const AUTH_COOKIE_NAME = "salon_session";
function jwtSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not configured");
    return secret;
}
function assertAuthConfigured() {
    jwtSecret();
}
function createAuthToken(user) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign(user, jwtSecret(), {
        expiresIn: "7d"
    });
}
function verifyAuthToken(token) {
    try {
        const payload = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, jwtSecret());
        if (typeof payload === "string" || typeof payload.userId !== "string" || payload.role !== "customer" && payload.role !== "admin") {
            return null;
        }
        return {
            userId: payload.userId,
            role: payload.role
        };
    } catch  {
        return null;
    }
}
async function getAuthUser() {
    const token = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])()).get(AUTH_COOKIE_NAME)?.value;
    return token ? verifyAuthToken(token) : null;
}
const authCookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    secure: ("TURBOPACK compile-time value", "development") === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
};
}),
"[project]/src/lib/db/mongoose.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "connectDB",
    ()=>connectDB
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const globalWithMongoose = globalThis;
const cache = globalWithMongoose.mongooseCache ?? {
    connection: null,
    promise: null
};
globalWithMongoose.mongooseCache = cache;
async function connectDB() {
    const mongodbUri = process.env.MONGODB_URI;
    if (!mongodbUri) {
        throw new Error("MONGODB_URI is not defined. Add it to .env.local.");
    }
    if (cache.connection) return cache.connection;
    cache.promise ??= __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].connect(mongodbUri);
    try {
        cache.connection = await cache.promise;
    } catch (error) {
        cache.promise = null;
        throw error;
    }
    return cache.connection;
}
}),
"[project]/src/models/Notification.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const notificationSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    senderId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    recipientId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    message: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    },
    readAt: {
        type: Date
    }
}, {
    timestamps: true,
    collection: "notifications"
});
notificationSchema.index({
    recipientId: 1,
    createdAt: -1
});
notificationSchema.index({
    senderId: 1,
    createdAt: -1
});
const Notification = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Notification ?? __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model("Notification", notificationSchema);
const __TURBOPACK__default__export__ = Notification;
}),
"[project]/src/models/User.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const userSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        trim: true,
        default: "/window.svg"
    },
    rewardPoints: {
        type: Number,
        min: 0,
        default: 0
    },
    lifetimeRewardPoints: {
        type: Number,
        min: 0,
        default: 0
    },
    lastLoginAt: {
        type: Date
    },
    passwordResetTokenHash: {
        type: String,
        select: false
    },
    passwordResetExpiresAt: {
        type: Date,
        select: false
    },
    role: {
        type: String,
        enum: [
            "customer",
            "admin"
        ],
        default: "customer"
    }
}, {
    timestamps: true,
    collection: "users"
});
const User = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.User ?? __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model("User", userSchema);
const __TURBOPACK__default__export__ = User;
}),
"[project]/src/repositories/notification.repository.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "countUnreadNotifications",
    ()=>countUnreadNotifications,
    "getNotifications",
    ()=>getNotifications,
    "markNotificationRead",
    ()=>markNotificationRead,
    "sendToAllAdmins",
    ()=>sendToAllAdmins,
    "sendToRecipient",
    ()=>sendToRecipient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/mongoose.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Notification$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/Notification.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/User.ts [app-route] (ecmascript)");
;
;
;
function toView(notification) {
    return {
        id: notification._id.toString(),
        title: notification.title,
        message: notification.message,
        readAt: notification.readAt?.toISOString() ?? null,
        createdAt: notification.createdAt.toISOString(),
        sender: {
            id: notification.senderId._id.toString(),
            name: notification.senderId.name,
            role: notification.senderId.role
        },
        recipient: {
            id: notification.recipientId._id.toString(),
            name: notification.recipientId.name,
            role: notification.recipientId.role
        }
    };
}
async function getNotifications(userId, box) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
    const query = box === "sent" ? {
        senderId: userId
    } : {
        recipientId: userId
    };
    const records = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Notification$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find(query).populate("senderId", "name role").populate("recipientId", "name role").sort({
        createdAt: -1
    }).lean();
    return records.map((record)=>toView(record));
}
async function countUnreadNotifications(userId) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Notification$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].countDocuments({
        recipientId: userId,
        readAt: {
            $exists: false
        }
    });
}
async function sendToRecipient(senderId, recipientId, content) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Notification$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create({
        senderId,
        recipientId,
        ...content
    });
}
async function sendToAllAdmins(senderId, content) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
    const admins = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({
        role: "admin"
    }).select("_id").lean();
    if (admins.length === 0) return [];
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Notification$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].insertMany(admins.map((admin)=>({
            senderId,
            recipientId: admin._id,
            ...content
        })));
}
async function markNotificationRead(id, recipientId) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Notification$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOneAndUpdate({
        _id: id,
        recipientId
    }, {
        $set: {
            readAt: new Date()
        }
    }, {
        new: true
    });
}
}),
"[project]/src/repositories/user.repository.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createUser",
    ()=>createUser,
    "deleteUser",
    ()=>deleteUser,
    "findUserByEmail",
    ()=>findUserByEmail,
    "findUserById",
    ()=>findUserById,
    "getCustomers",
    ()=>getCustomers,
    "recordUserLogin",
    ()=>recordUserLogin,
    "redeemUserReward",
    ()=>redeemUserReward,
    "updateUser",
    ()=>updateUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/mongoose.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/User.ts [app-route] (ecmascript)");
;
;
async function createUser(data) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create(data);
}
async function findUserByEmail(email) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
        email: email.trim().toLowerCase()
    });
}
async function findUserById(id) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findById(id);
}
async function getCustomers() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].aggregate([
        {
            $match: {
                role: "customer"
            }
        },
        {
            $lookup: {
                from: "appointments",
                localField: "_id",
                foreignField: "userId",
                as: "appointments"
            }
        },
        {
            $project: {
                name: 1,
                email: 1,
                image: 1,
                appointmentCount: {
                    $size: "$appointments"
                },
                lastAppointment: {
                    $max: "$appointments.startDateTime"
                },
                createdAt: 1
            }
        },
        {
            $sort: {
                name: 1
            }
        }
    ]);
}
async function updateUser(id, data) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });
}
async function deleteUser(id) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findByIdAndDelete(id);
}
async function redeemUserReward(id, cost) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOneAndUpdate({
        _id: id,
        role: "customer",
        rewardPoints: {
            $gte: cost
        }
    }, {
        $inc: {
            rewardPoints: -cost
        }
    }, {
        new: true,
        runValidators: true
    });
}
async function recordUserLogin(id) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$mongoose$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$User$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findByIdAndUpdate(id, {
        lastLoginAt: new Date()
    }, {
        new: true
    });
}
}),
"[project]/src/validations/notification.validation.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendNotificationSchema",
    ()=>sendNotificationSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
;
const sendNotificationSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    recipientId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().optional(),
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, "Subject is required.").max(100),
    message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, "Message is required.").max(1000)
});
}),
"[project]/src/app/api/notifications/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/errors.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$repositories$2f$notification$2e$repository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/repositories/notification.repository.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$repositories$2f$user$2e$repository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/repositories/user.repository.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$validations$2f$notification$2e$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/validations/notification.validation.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
async function GET(request) {
    try {
        const auth = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAuthUser"])();
        if (!auth) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Authentication required."
            }, {
                status: 401
            });
        }
        const box = new URL(request.url).searchParams.get("box") === "sent" ? "sent" : "inbox";
        const [notifications, unreadCount] = await Promise.all([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$repositories$2f$notification$2e$repository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getNotifications"])(auth.userId, box),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$repositories$2f$notification$2e$repository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["countUnreadNotifications"])(auth.userId)
        ]);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            notifications,
            unreadCount
        });
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serverError"])("Loading notifications failed:", error);
    }
}
async function POST(request) {
    try {
        const auth = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAuthUser"])();
        if (!auth) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Authentication required."
            }, {
                status: 401
            });
        }
        const input = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$validations$2f$notification$2e$validation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendNotificationSchema"].parse(await request.json());
        const content = {
            title: input.title,
            message: input.message
        };
        if (auth.role === "customer") {
            const notifications = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$repositories$2f$notification$2e$repository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendToAllAdmins"])(auth.userId, content);
            if (notifications.length === 0) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    message: "No admin account is available."
                }, {
                    status: 409
                });
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                message: "Message sent to the salon team."
            }, {
                status: 201
            });
        }
        if (!input.recipientId || !(0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["isValidObjectId"])(input.recipientId)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Select a valid customer."
            }, {
                status: 400
            });
        }
        const recipient = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$repositories$2f$user$2e$repository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findUserById"])(input.recipientId);
        if (!recipient || recipient.role !== "customer") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Customer not found."
            }, {
                status: 404
            });
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$repositories$2f$notification$2e$repository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendToRecipient"])(auth.userId, input.recipientId, content);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Notification sent."
        }, {
            status: 201
        });
    } catch (error) {
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodError"]) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validationError"])(error);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serverError"])("Sending notification failed:", error);
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0zn6w3p._.js.map