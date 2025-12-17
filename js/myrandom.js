// VC-1 Computer System
// Copyright (C) 2023 Appledog Hu
//
// SPDX-License-Identifier: GPL-2.0-only WITH VC-1-runtime-exception
// See LICENSE file for details.
//

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomLetter(bc = false) {
    let s = "abcdefghijklmnopqrstuvwxyz";
    if (bc) {
        s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    const i = Math.floor(Math.random() * s.length);
    return s.charAt(i);
}

function getRandomMatrixCode() {
    const s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=_+[]{}|;:'\",.<>/?`~ΣΩαβγδεζηθικλμνξοπρςτυφχψωぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんーアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロヮワヰヱヲンーヴ";
    const i = Math.floor(Math.random() * s.length);
    return s.charAt(i);
}

function getRandomBase64(urlsafe = false) {
    let s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    if (urlsafe) {
        s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    }

    const i = Math.floor(Math.random() * s.length);
    return s.charAt(i);
}
