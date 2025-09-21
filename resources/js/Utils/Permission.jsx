import { usePage } from "@inertiajs/react";

export default function hasAnyPermission(user, permissions) {
    // 1. Cek dulu apakah user.permissions ada, dan merupakan sebuah array yang tidak kosong.
    if (
        !user.permissions ||
        !Array.isArray(user.permissions) ||
        user.permissions.length === 0
    ) {
        // Jika tidak, langsung kembalikan false karena user pasti tidak punya izin yang dicari.
        return false;
    }

    // 2. Jika aman, baru jalankan logika pengecekan permission.
    return permissions.some((permission) =>
        user.permissions.includes(permission),
    );
}

