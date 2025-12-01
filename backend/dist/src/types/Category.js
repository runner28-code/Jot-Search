"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALLOWED_CATEGORY_FILTER_KEYS = new Set([
    "id",
    "dataAdded",
    "description",
    "enabled",
    "name",
    "occupation",
    "type",
    "_score",
]);
exports.CATEGORY_NON_STRING_FIELDS = new Set([
    "id",
    "_score",
    "enabled",
