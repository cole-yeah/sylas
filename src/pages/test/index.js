function n(n, r) {
  var t = (65535 & n) + (65535 & r);
  return (((n >> 16) + (r >> 16) + (t >> 16)) << 16) | (65535 & t);
}

function r(r, t, e, u, o, c) {
  return n(((f = n(n(t, r), n(u, c))) << (i = o)) | (f >>> (32 - i)), e);
  var f, i;
}

function t(n, t, e, u, o, c, f) {
  return r((t & e) | (~t & u), n, t, o, c, f);
}

function e(n, t, e, u, o, c, f) {
  return r((t & u) | (e & ~u), n, t, o, c, f);
}

function u(n, t, e, u, o, c, f) {
  return r(t ^ e ^ u, n, t, o, c, f);
}

function o(n, t, e, u, o, c, f) {
  return r(e ^ (t | ~u), n, t, o, c, f);
}

function c(r, c) {
  (r[c >> 5] |= 128 << c % 32), (r[14 + (((c + 64) >>> 9) << 4)] = c);
  var f,
    i,
    a,
    h,
    l,
    g = 1732584193,
    v = -271733879,
    d = -1732584194,
    C = 271733878;
  for (f = 0; f < r.length; f += 16)
    (i = g),
      (a = v),
      (h = d),
      (l = C),
      (g = t(g, v, d, C, r[f], 7, -680876936)),
      (C = t(C, g, v, d, r[f + 1], 12, -389564586)),
      (d = t(d, C, g, v, r[f + 2], 17, 606105819)),
      (v = t(v, d, C, g, r[f + 3], 22, -1044525330)),
      (g = t(g, v, d, C, r[f + 4], 7, -176418897)),
      (C = t(C, g, v, d, r[f + 5], 12, 1200080426)),
      (d = t(d, C, g, v, r[f + 6], 17, -1473231341)),
      (v = t(v, d, C, g, r[f + 7], 22, -45705983)),
      (g = t(g, v, d, C, r[f + 8], 7, 1770035416)),
      (C = t(C, g, v, d, r[f + 9], 12, -1958414417)),
      (d = t(d, C, g, v, r[f + 10], 17, -42063)),
      (v = t(v, d, C, g, r[f + 11], 22, -1990404162)),
      (g = t(g, v, d, C, r[f + 12], 7, 1804603682)),
      (C = t(C, g, v, d, r[f + 13], 12, -40341101)),
      (d = t(d, C, g, v, r[f + 14], 17, -1502002290)),
      (g = e(
        g,
        (v = t(v, d, C, g, r[f + 15], 22, 1236535329)),
        d,
        C,
        r[f + 1],
        5,
        -165796510,
      )),
      (C = e(C, g, v, d, r[f + 6], 9, -1069501632)),
      (d = e(d, C, g, v, r[f + 11], 14, 643717713)),
      (v = e(v, d, C, g, r[f], 20, -373897302)),
      (g = e(g, v, d, C, r[f + 5], 5, -701558691)),
      (C = e(C, g, v, d, r[f + 10], 9, 38016083)),
      (d = e(d, C, g, v, r[f + 15], 14, -660478335)),
      (v = e(v, d, C, g, r[f + 4], 20, -405537848)),
      (g = e(g, v, d, C, r[f + 9], 5, 568446438)),
      (C = e(C, g, v, d, r[f + 14], 9, -1019803690)),
      (d = e(d, C, g, v, r[f + 3], 14, -187363961)),
      (v = e(v, d, C, g, r[f + 8], 20, 1163531501)),
      (g = e(g, v, d, C, r[f + 13], 5, -1444681467)),
      (C = e(C, g, v, d, r[f + 2], 9, -51403784)),
      (d = e(d, C, g, v, r[f + 7], 14, 1735328473)),
      (g = u(
        g,
        (v = e(v, d, C, g, r[f + 12], 20, -1926607734)),
        d,
        C,
        r[f + 5],
        4,
        -378558,
      )),
      (C = u(C, g, v, d, r[f + 8], 11, -2022574463)),
      (d = u(d, C, g, v, r[f + 11], 16, 1839030562)),
      (v = u(v, d, C, g, r[f + 14], 23, -35309556)),
      (g = u(g, v, d, C, r[f + 1], 4, -1530992060)),
      (C = u(C, g, v, d, r[f + 4], 11, 1272893353)),
      (d = u(d, C, g, v, r[f + 7], 16, -155497632)),
      (v = u(v, d, C, g, r[f + 10], 23, -1094730640)),
      (g = u(g, v, d, C, r[f + 13], 4, 681279174)),
      (C = u(C, g, v, d, r[f], 11, -358537222)),
      (d = u(d, C, g, v, r[f + 3], 16, -722521979)),
      (v = u(v, d, C, g, r[f + 6], 23, 76029189)),
      (g = u(g, v, d, C, r[f + 9], 4, -640364487)),
      (C = u(C, g, v, d, r[f + 12], 11, -421815835)),
      (d = u(d, C, g, v, r[f + 15], 16, 530742520)),
      (g = o(
        g,
        (v = u(v, d, C, g, r[f + 2], 23, -995338651)),
        d,
        C,
        r[f],
        6,
        -198630844,
      )),
      (C = o(C, g, v, d, r[f + 7], 10, 1126891415)),
      (d = o(d, C, g, v, r[f + 14], 15, -1416354905)),
      (v = o(v, d, C, g, r[f + 5], 21, -57434055)),
      (g = o(g, v, d, C, r[f + 12], 6, 1700485571)),
      (C = o(C, g, v, d, r[f + 3], 10, -1894986606)),
      (d = o(d, C, g, v, r[f + 10], 15, -1051523)),
      (v = o(v, d, C, g, r[f + 1], 21, -2054922799)),
      (g = o(g, v, d, C, r[f + 8], 6, 1873313359)),
      (C = o(C, g, v, d, r[f + 15], 10, -30611744)),
      (d = o(d, C, g, v, r[f + 6], 15, -1560198380)),
      (v = o(v, d, C, g, r[f + 13], 21, 1309151649)),
      (g = o(g, v, d, C, r[f + 4], 6, -145523070)),
      (C = o(C, g, v, d, r[f + 11], 10, -1120210379)),
      (d = o(d, C, g, v, r[f + 2], 15, 718787259)),
      (v = o(v, d, C, g, r[f + 9], 21, -343485551)),
      (g = n(g, i)),
      (v = n(v, a)),
      (d = n(d, h)),
      (C = n(C, l));
  return [g, v, d, C];
}

function f(n) {
  var r,
    t = '';
  for (r = 0; r < 32 * n.length; r += 8)
    t += String.fromCharCode((n[r >> 5] >>> r % 32) & 255);
  return t;
}

function i(n) {
  var r,
    t = [];
  for (t[(n.length >> 2) - 1] = void 0, r = 0; r < t.length; r += 1) t[r] = 0;
  for (r = 0; r < 8 * n.length; r += 8)
    t[r >> 5] |= (255 & n.charCodeAt(r / 8)) << r % 32;
  return t;
}

function md5(n) {
  var r,
    t,
    e = '';
  for (t = 0; t < n.length; t += 1)
    (r = n.charCodeAt(t)),
      (e +=
        '0123456789ABCDEF'.charAt((r >>> 4) & 15) +
        '0123456789ABCDEF'.charAt(15 & r));
  return e;
}

function h(n) {
  return unescape(encodeURIComponent(n));
}

function l(n) {
  return (function (n) {
    return f(c(i(n), 8 * n.length));
  })(h(n));
}

function g(n, r) {
  return (function (n, r) {
    var t,
      e,
      u = i(n),
      o = [],
      a = [];
    for (
      o[15] = a[15] = void 0, u.length > 16 && (u = c(u, 8 * n.length)), t = 0;
      t < 16;
      t += 1
    )
      (o[t] = 909522486 ^ u[t]), (a[t] = 1549556828 ^ u[t]);
    return (e = c(o.concat(i(r)), 512 + 8 * r.length)), f(c(a.concat(e), 640));
  })(h(n), h(r));
}

var obj = {
  os: 'APPLET',
  osVersion: '1.0.0',
  userId: '919528700196872192',
  userToken: '8e601f3343de4410b7a1b8c880de1e35',
};

function qs1(t, n) {
  var r = [];
  for (var a in t) r.push(''.concat(a, '=').concat(t[a]));
  var o = ''.concat(r.join('&')).concat('e348db70-2e67-4a72-9578-8b40ad809cbb');
  n && (o = ''.concat(o).concat(JSON.stringify(n)));
  o = o
    .replace(/a/gm, 'c')
    .replace(/e/gm, 'g')
    .replace(new RegExp(' ', 'gm'), '');
  return md5(l(o));
}

var extraParams = {};

obj.sign = qs1(obj, extraParams);

function qs2(e) {
  var t = '';
  for (var o in e) t += o + '=' + e[o] + '&';
  return (
    (t = t.length > 0 ? '?' + t.substring(0, t.length - 1) : ''), encodeURI(t)
  );
}

var strParams = qs2(obj);

console.log('------', strParams);
