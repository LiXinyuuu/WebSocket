/**
 * Created by Administrator on 2021/2/15.
 */
var INFINITE = 999999;
var PD = {
    A1: 0,
    D2: 1,
    D3: 2,
    D4: 3,
    A2: 4,
    A3: 5,
    A2_A2: 6,
    A3_A3: 7,
    D4_A3: 8,
    D4_D4: 9,
    A4: 10,
    A5: 11
};
var PV = [0, 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];
var FS = [
    [0, 0, "A1"],
    [1, 5, "D2"],
    [1, 5, "D3"],
    [1, 5, "D4"],
    [3, 10, "A2"],
    [3, 15, "A3"],
    [4, 30, "A2_A2"],
    [14, 500, "A3_A3"],
    [18, 1500, "D4_A3"],
    [19, 2000, "D4_D4"],
    [20, 2000, "A4"],
    [22, INFINITE, "A5"]
];
var LS = [
    [0, 0, "A1"],
    [1, 5, "D2"],
    [1, 5, "D3"],
    [1, 14000, "D4"],
    [3, 10, "A2"],
    [3, 1000, "A3"],
    [3, 30, "A2_A2"],
    [13, 1200, "A3_A3"],
    [15, 15000, "D4_A3"],
    [16, 20000, "D4_D4"],
    [17, 20000, "A4"],
    [21, INFINITE]
];

function Brain() {
    var q = 6;
    var k = 10;
    var t;
    var n;
    var l, a;
    var b = false;
    var c = false;
    var e = false;
    this.setLevel = function(u) {
        if (u == 1) {
            b = c = e = false
        } else {
            if (u == 2) {
                c = true;
                b = false;
                e = false
            } else {
                if (u == 3) {
                    c = true;
                    b = true;
                    e = false
                } else {
                    if (u == 4) {
                        c = true;
                        b = true;
                        e = true
                    }
                }
            }
        }
    };
    var d = function(y) {
        var v = (t[y] > 0) ? 1 : -1;
        for (var w = -2; w <= 2; ++w) {
            for (var u = -2; u <= 2; ++u) {
                var x = y + w + u * (BS + 2);
                if (x >= 0 && x < DS && t[x] >= 0) {
                    n[x] += v
                }
            }
        }
    };
    var p = function(C, x, N, M) {
        var L = PD.A1;
        var E = 1;
        var R = 0,
            P = 0;
        var w = 0,
            v = 0;
        for (var T = 1; T <= 4; ++T) {
            var O = C + (-T) * N + (-T) * M * (BS + 2);
            if (t[O] < 0) {
                break
            }
            var z = t[O];
            if (z == x) {
                R = w = -T;
                ++E
            } else {
                if (z == 0) {
                    w = -T
                } else {
                    break
                }
            }
        }
        for (var T = 1; T <= 4; ++T) {
            var O = C + T * N + T * M * (BS + 2);
            if (t[O] < 0) {
                break
            }
            var z = t[O];
            if (z == x) {
                P = v = T;
                ++E
            } else {
                if (z == 0) {
                    v = T
                } else {
                    break
                }
            }
        }
        var D = v - w + 1;
        if (D >= 5 && E > 1) {
            if (P - R > 4) {
                var K = 0;
                var I, G;
                for (var T = R; T <= P - 4; ++T) {
                    var F = 1,
                        A, y;
                    var B = true;
                    for (var S = T; S <= T + 4; ++S) {
                        var O = C + S * N + S * M * (BS + 2);
                        if (t[O] == x) {
                            ++F;
                            if (B) {
                                y = A = S;
                                B = false
                            } else {
                                y = S
                            }
                        }
                    }
                    if (A > 0) {
                        A = 0
                    }
                    if (y < 0) {
                        y = 0
                    }
                    if (F > K) {
                        K = F;
                        I = A;
                        G = y
                    } else {
                        if (F == K) {
                            if (y - A < G - I) {
                                I = A;
                                G = y
                            }
                        }
                    }
                }
                E = K;
                R = I;
                P = G;
                if (R > 0) {
                    R = 0
                }
                if (P < 0) {
                    P = 0
                }
            }
            var Q = P - R + 1;
            var u = false;
            var J = C + (R - 1) * N + (R - 1) * M * (BS + 2);
            var H = C + (P + 1) * N + (P + 1) * M * (BS + 2);
            if (t[J] >= 0 && t[H] >= 0) {
                u = (t[J] == 0 || t[J] == x) && (t[H] == 0 || t[H] == x)
            }
            switch (E) {
                case 5:
                    L = PD.A5;
                    break;
                case 4:
                    L = (D > 5 && Q == 4 && u) ? PD.A4 : PD.D4;
                    break;
                case 3:
                    L = (D > 5 && Q <= 4 && u) ? PD.A3 : PD.D3;
                    break;
                case 2:
                    if (D > 5) {
                        if (Q == 2 && u) {
                            L = PD.A2
                        } else {
                            if (Q == 3) {
                                L = PD.D2
                            }
                        }
                    }
                    break
            }
        }
        return L
    };
    var j = function(y, A) {
        var C = new Array(12);
        for (var x = 0; x < 12; ++x) {
            C[x] = 0
        }
        C[p(y, A, 1, 0)]++;
        C[p(y, A, 0, 1)]++;
        C[p(y, A, 1, 1)]++;
        C[p(y, A, 1, -1)]++;
        var u = C[PD.A3];
        var B = C[PD.D4];
        if (C[PD.A2] >= 2) {
            C[PD.A2_A2]++
        }
        if (u >= 2) {
            C[PD.A3_A3]++
        }
        if (B >= 2) {
            C[PD.D4_D4]++
        } else {
            if (B >= 1 && u >= 1) {
                C[PD.D4_A3]++
            }
        }
        var v = 0;
        var z = 0;
        for (var w = 11; w >= 0; --w) {
            if (C[w] != 0) {
                v |= PV[w];
                if (z == 0) {
                    z = w
                }
            }
        }
        return [z, v]
    };
    var h = function(u) {
        var v = function(x, w) {
            for (var z = 1; z <= 4; ++z) {
                var y = u + z * x + z * w * (BS + 2);
                if (y >= 0 && y < DS) {
                    if (t[y] < 0) {
                        break
                    }
                    if (t[y] == 0 && n[y] > 0) {
                        a[y] = j(y, 1);
                        l[y] = j(y, 2)
                    } else {
                        a[y] = l[y] = -1
                    }
                }
            }
        };
        v(1, 0);
        v(-1, 0);
        v(0, 1);
        v(0, -1);
        v(1, 1);
        v(-1, -1);
        v(1, -1);
        v(-1, 1)
    };
    var g = function(v, w) {
        var u = w[0] + w[1] * (BS + 2);
        t[u] = v;
        a[u] = l[u] = -1;
        d(u);
        h(u)
    };
    var f = function(v) {
        var u = v[0] + v[1] * (BS + 2);
        t[u] = 0;
        d(u);
        if (n[u] > 0) {
            a[u] = j(u, 1);
            l[u] = j(u, 2)
        } else {
            a[u] = l[u] = -1
        }
        h(u)
    };
    this.scan = function(A) {
        t = A.getData();
        n = new Array(DS);
        l = new Array(DS);
        a = new Array(DS);
        for (var z = 0; z < DS; ++z) {
            n[z] = 0;
            l[z] = a[z] = -1
        }
        for (var u = 1; u <= BS; ++u) {
            for (var B = 1; B <= BS; ++B) {
                var w = u + B * (BS + 2);
                var v = t[w];
                if (v > 0) {
                    d(w)
                }
            }
        }
        for (var u = 1; u <= BS; ++u) {
            for (var B = 1; B <= BS; ++B) {
                var w = u + B * (BS + 2);
                var v = t[w];
                if (v == 0 && n[w] > 0) {
                    a[w] = j(w, 1);
                    l[w] = j(w, 2)
                }
            }
        }
        return [n, a, l]
    };
    var m = function(J) {
        var z = (J == BLACK) ? a : l;
        var D = (J == BLACK) ? l : a;
        var u = (J == BLACK);
        var w = -1;
        var F = [];
        var A = {};
        var B = true;
        for (var G = 1; G <= BS; ++G) {
            for (var E = 1; E <= BS; ++E) {
                var C = G + E * (BS + 2);
                if (z[C] != -1 && D[C] != -1) {
                    var I = FS[z[C][0]][0];
                    var H = LS[D[C][0]][0];
                    if (I < 13 && u) {
                        ++I
                    }
                    if (H < 13 && (!u)) {
                        ++H
                    }
                    var K = I > H ? I : H;
                    var v = [G, E];
                    if (K > w) {
                        w = K;
                        F = [v];
                        A = {};
                        A[v] = I + H;
                        B = (I > H)
                    } else {
                        if (K == w) {
                            F.push(v);
                            A[v] = I + H
                        }
                    }
                }
            }
        }
        if (F.length > 1) {
            F.sort(function(y, x) {
                var L = 0.5;
                if (A[y] < A[x]) {
                    L = 0.8
                } else {
                    if (A[y] > A[x]) {
                        deta = 0.2
                    }
                }
                return Math.random() - L
            })
        }
        return [w, F, B]
    };
    var r = function(z, A) {
        var w = (z == BLACK) ? l : a;
        var v = [];
        var u = A[0];
        var C = A[1];
        var B = function(y, x) {
            for (var E = 1; E <= 4; ++E) {
                var H = u + E * y;
                var G = C + E * x;
                var D = H + G * (BS + 2);
                if (t[D] < 0) {
                    break
                }
                if (t[D] == 0) {
                    var F = w[D][1];
                    if (F & PV[PD.A5]) {
                        v = [
                            [H, G]
                        ];
                        return false
                    }
                    if (F & PV[PD.A4]) {
                        v.push([H, G])
                    }
                }
            }
            return true
        };
        if (B(1, 0) && B(-1, 0) && B(0, 1) && B(0, -1) && B(1, 1) && B(-1, -1) && B(1, -1) && B(-1, 1)) {}
        return v
    };
    var i = function(O, U, I, W) {
        if (U >= q) {
            return false
        }
        var S = (O == BLACK) ? a : l;
        var V = (O == BLACK) ? l : a;
        var R = [];
        var B = -1;
        var T = -1;
        var v = [];
        for (var F = 1; F <= BS; ++F) {
            for (var D = 1; D <= BS; ++D) {
                var C = F + D * (BS + 2);
                if (S[C] != -1) {
                    var M = S[C][1];
                    if ((M & PV[PD.D4]) || (M & PV[PD.A4]) || (M & PV[PD.A3])) {
                        R.push([F, D])
                    }
                    var G = FS[S[C][0]][0];
                    var E = LS[V[C][0]][0];
                    if (G > B) {
                        v = [F, D];
                        B = G
                    }
                    if (E > T) {
                        T = E
                    }
                }
            }
        }
        if (B > T && B >= 13) {
            I.push(v);
            return true
        } else {
            if (B < T && T > 13) {
                return false
            }
        }
        for (var Q = 0; Q < R.length; ++Q) {
            var A = R[Q];
            if (W) {
                var J = W[0] - A[0];
                var H = W[1] - A[1];
                if (J < 0) {
                    J = -J
                }
                if (H < 0) {
                    H = -H
                }
                var w = J > H ? J : H;
                if (w > 6) {
                    continue
                }
            }
            g(O, A);
            var L = r(3 - O, A);
            var K = false;
            var u;
            for (var P = 0; P < L.length; ++P) {
                u = [];
                var z = L[P];
                g(3 - O, z);
                K = i(O, U + 1, u, A);
                f(z);
                if (!K) {
                    break
                }
            }
            f(A);
            if (K) {
                for (var N = 0; N < u.length; ++N) {
                    I.push(u[N])
                }
                I.push(A);
                return true
            }
        }
        return false
    };
    var o = function(I, M, D, O) {
        var L = (I == BLACK) ? a : l;
        var N = (I == BLACK) ? l : a;
        var K = [];
        var u = false;
        for (var C = 1; C <= BS; ++C) {
            for (var B = 1; B <= BS; ++B) {
                var A = C + B * (BS + 2);
                if (L[A] != -1) {
                    var H = L[A][1];
                    if ((H & PV[PD.D4]) || (H & PV[PD.A4])) {
                        K.push([C, B])
                    }
                    if (L[A][0] == PD.A5) {
                        D.push([C, B]);
                        return true
                    }
                    if (N[A][0] == PD.A5) {
                        u = true
                    }
                }
            }
        }
        if (u) {
            return false
        }
        for (var J = 0; J < K.length; ++J) {
            var z = K[J];
            if (O) {
                var F = O[0] - z[0];
                var E = O[1] - z[1];
                if (F < 0) {
                    F = -F
                }
                if (E < 0) {
                    E = -E
                }
                var v = F > E ? F : E;
                if (v > 6) {
                    continue
                }
            }
            g(I, z);
            var w = r(3 - I, z)[0];
            g(3 - I, w);
            var G = o(I, M + 1, D, z);
            f(w);
            f(z);
            if (G) {
                D.push(z);
                return true
            }
        }
        return false
    };
    var s = function(A) {
        var z = (A == BLACK) ? a : l;
        var v = [];
        var C = {};
        for (var u = 1; u <= BS; ++u) {
            for (var D = 1; D <= BS; ++D) {
                var w = u + D * (BS + 2);
                if (z[w] != -1 && n[w] > 0) {
                    var B = z[w][0];
                    if (B == PD.A2_A2 || B == PD.A2 || B == PD.D3 || B == PD.A2) {
                        v.push([u, D])
                    }
                }
            }
        }
        v.sort(function(E, x) {
            var F = E[0] + E[1] * (BS + 2);
            var y = x[0] + x[1] * (BS + 2);
            return n[F] - n[y]
        });
        return v
    };
    this.findBestStep = function(y) {
        var x = (new Date()).getTime();
        this.scan(y);
        var C = y.getPlayer();
        var F = m(C);
        var D = F[0];
        var w = F[1];
        var v = F[2];
        var B = [];
        while (c || b) {
            var z;
            if (D >= 18) {
                B = w[0];
                break
            }
            z = [];
            if (c && o(C, 0, z) && z.length > 0) {
                console.debug("VCF detected,result:" + z);
                B = z[z.length - 1];
                break
            }
            z = [];
            if (c && o(3 - C, 0, z) && z.length > 0) {
                console.debug("VCF detected for opp,result:" + z);
                var E = false;
                var u;
                while (z.length > 0 && !E) {
                    u = z.pop();
                    console.debug("try to defend vcf at step:" + u);
                    g(C, u);
                    if (!o(3 - C, 0, [])) {
                        B = u;
                        if (!i(3 - C, 0, [])) {
                            E = true
                        }
                    }
                    f(u)
                }
                if (B.length == 0) {
                    B = w[0]
                }
                break
            }
            if (D >= 14) {
                B = w[0];
                break
            }
            z = [];
            if (b && i(C, 0, z) && z.length > 0) {
                console.debug("VCT detected,result:" + z);
                B = z[z.length - 1];
                break
            }
            z = [];
            if (b && i(3 - C, 0, z) && z.length > 0) {
                console.debug("VCT detected for opp,result:" + z);
                var E = false;
                while (z.length > 0 && !E) {
                    B = z.pop();
                    console.debug("try to defend vct at step:" + B);
                    g(C, B);
                    if (!i(3 - C, 0, [])) {
                        E = true
                    }
                    f(B)
                }
                if (!E) {
                    B = w[0]
                }
                break
            }
            if (e) {
                z = s(BLACK);
                var E = false;
                while (z.length > 0 && !E && (((new Date()).getTime() - x) <= 5000)) {
                    var u = z.pop();
                    g(BLACK, u);
                    if (o(BLACK, 0, []) || i(BLACK, 0, [])) {
                        console.debug("VC2 detected,step:" + u);
                        B = u;
                        E = true
                    }
                    f(u)
                }
            }
            break
        }
        if (B.length == 0) {
            if (w.length > 1) {
                var A = Math.floor((Math.random() * w.length));
                B = w[A]
            } else {
                B = w[0]
            }
        }
        x = (new Date()).getTime() - x;
        console.debug("best step:" + B + " ,costs:" + x + " ms");
        return B
    }
};