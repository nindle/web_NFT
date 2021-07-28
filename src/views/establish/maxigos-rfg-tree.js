// maxiGos v7 Rfg+Tree copyright 1998-2020 FM, BSD license

// maxiGos v7 > mgos_lib.js
if (typeof mxG == "undefined") mxG = {};
if (!mxG.V) {
  mxG.V = "7";
  mxG.Y = "2020";
  mxG.D = [];
  mxG.K = 0;
  if (!mxG.Z) mxG.Z = [];
  if (!mxG.Z.fr) mxG.Z.fr = [];
  if (!mxG.Z.en) mxG.Z.en = [];
  String.prototype.c2n = function(k) {
    var n = this.charCodeAt(k);
    return n - (n < 97 ? 38 : 96);
  };
  String.prototype.ucFirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };
  String.prototype.lcFirst = function() {
    return this.charAt(0).toLowerCase() + this.slice(1);
  };
  mxG.isArray = function(a) {
    return a.constructor === Array;
  };
  mxG.getMClick = function(ev) {
    var b = this.getBoundingClientRect();
    return { x: ev.clientX - b.left, y: ev.clientY - b.top };
  };
  mxG.getKCode = function(ev) {
    var c;
    if (!ev) ev = window.event;
    if (ev.altKey || ev.ctrlKey || ev.metaKey) return 0;
    c = ev.keyCode;
    if (ev.charCode && c == 0) c = ev.charCode;
    return c;
  };
  mxG.createUnselectable = function() {
    if (!mxG.unselectable) {
      let s = document.createElement("style"),
        c = "",
        k,
        km;
      let a = ["-webkit-", "-moz-", "-ms-", ""];
      km = a.length;
      for (k = 0; k < km; k++) c += a[k] + "user-select:none;";
      s.type = "text/css";
      s.innerHTML = ".mxUnselectable {" + c + "}";
      document.getElementsByTagName("head")[0].appendChild(s);
      mxG.unselectable = 1;
    }
  };
  mxG.b64EncodeUnicode = function(str) {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(
        match,
        p1
      ) {
        return String.fromCharCode("0x" + p1);
      })
    );
  };
  mxG.random = function(n) {
    return Math.floor(Math.random() * n);
  };
  mxG.shuffle = function(a) {
    var i, j, z;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      z = a[i];
      a[i] = a[j];
      a[j] = z;
    }
    return a;
  };
  mxG.isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
  mxG.canOpen = function() {
    var r;
    return (
      !(typeof FileReader == "undefined") &&
      (r = new FileReader()) &&
      r.readAsText
    );
  };
  mxG.getLang = function(t) {
    var lang, m;
    while (t && !t.lang) t = t.parentNode;
    t = t ? t.lang : navigator.language || "en";
    return t;
  };
  mxG.fr = function(a, b) {
    if (mxG.Z.fr[a] === undefined) mxG.Z.fr[a] = b;
  };
  mxG.en = function(a, b) {
    if (mxG.Z.en[a] === undefined) mxG.Z.en[a] = b;
  };
}
// maxiGos v7 > mgos_prs.js
// sgf parser
// mxG.N class (N=Node, P=Property, V=Value)
if (!mxG.N) {
  mxG.N = function(n, p, v) {
    this.Kid = [];
    this.P = {}; // P properties are B, W, AB, ...
    this.Dad = n;
    this.Focus = 0; // kid on focus: 0=>no kid, 1=>1st kid, Kid.length=>last kid
    if (n) {
      n.Kid.push(this);
      if (!n.Focus) n.Focus = 1;
    }
    if (p) this.P[p] = [v];
  };
  mxG.N.prototype.TakeOff = function(p, k) {
    if (this.P[p]) {
      if (k < 0) this.P[p].splice(0, this.P[p].length);
      else this.P[p].splice(k, 1);
      if (!this.P[p].length) delete this.P[p];
    }
  };
  mxG.N.prototype.Set = function(p, v) {
    if (typeof v == "object") this.P[p] = v;
    else this.P[p] = [v];
  };
  mxG.N.prototype.Clone = function(dad) {
    var p,
      k,
      bN = new mxG.N(dad, null, null);
    // better to check e.hasOwnProperty(p) when using for...in
    for (p in this.P)
      if (p.match(/^[A-Z]+$/) && this.P.hasOwnProperty(p))
        bN.P[p] = this.P[p].concat();
    for (k = 0; k < this.Kid.length; k++) bN.Kid[k] = this.Kid[k].Clone(bN);
    bN.Focus = this.Focus;
    return bN;
  };
}
// mxG.P class
if (!mxG.P) {
  mxG.P = function(s, coreOnly, mainOnly) {
    // no need to change charset
    this.rN = new mxG.N(null, null, null);
    this.coreOnly = coreOnly;
    this.mainOnly = mainOnly;
    this.parseSgf(s);
    if (!this.rN.Focus) this.parseSgf("(;FF[4]CA[UTF-8]GM[1]SZ[19])");
    return this.rN;
  };
  mxG.P.prototype.keep = function(a, p, v) {
    if (this.coreOnly && (a == "N" || a == "P" || a == "V"))
      return (
        p == "B" ||
        p == "W" ||
        p == "AB" ||
        p == "AW" ||
        p == "AE" ||
        p == "FF" ||
        p == "CA" ||
        p == "GM" ||
        p == "SZ" ||
        p == "EV" ||
        p == "RO" ||
        p == "DT" ||
        p == "PC" ||
        p == "PW" ||
        p == "WR" ||
        p == "WT" ||
        p == "PB" ||
        p == "BR" ||
        p == "BT" ||
        p == "RU" ||
        p == "TM" ||
        p == "OT" ||
        p == "HA" ||
        p == "KM" ||
        p == "RE" ||
        p == "VW"
      );
    return 1;
  };
  mxG.P.prototype.out = function(a, p, v) {
    if (this.keep(a, p, v))
      switch (a) {
        case "N":
          this.nN = new mxG.N(this.nN, p, v);
          break;
        case "P":
          this.nN.P[p] = [v];
          break;
        case "V":
          this.nN.P[p].push(v);
          break;
        case "v=":
          this.nN = this.v[this.v.length - 1];
          break;
        case "v+":
          this.v.push(this.nN);
          break;
        case "v-":
          this.v.pop();
          break;
      }
  };
  mxG.P.prototype.clean = function(s) {
    var r = s;
    // odd number of \ before \n or \r => sgf soft break
    // remove one \ and following \n\r, \r\n, \n or \r
    r = r.replace(/([^\\])((\\\\)*)\\((\n\r)|(\r\n)|\r|\n)/g, "$1$2");
    r = r.replace(/^((\\\\)*)\\((\n\r)|(\r\n)|\r|\n)/g, "$1");
    // remove \ preceded by even number of \
    r = r.replace(/([^\\])((\\\\)*)\\/g, "$1$2");
    r = r.replace(/^((\\\\)*)\\/g, "$1");
    // remove \ preceded by \
    r = r.replace(/\\\\/g, "\\");
    // replace \n\r, \r\n, and \r by \n
    r = r.replace(/(\n\r)|(\r\n)|\r/g, "\n");
    // strip html tags
    // r=r.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi,'');
    return r;
  };
  mxG.P.prototype.parseValue = function(p, K, c) {
    var v = "",
      a;
    K++; // by-pass '['
    while (K < this.len && (a = this.s.charAt(K)) != "]") {
      if (a == "\\") {
        v += a;
        K++;
        a = this.s.charAt(K);
      }
      if (K < this.len) v += a;
      K++;
    }
    v = this.clean(v);
    // cannot manage "tt" coordinates if goban size is larger than 19x19
    // if(((p=="B")||(p=="W"))&&(v=="tt")) v="";
    if (p == "RE") {
      a = v.slice(0, 1);
      if (a == "V" || a == "D") v = a;
    }
    if (this.nc) {
      this.nc = 0;
      this.out("N", p, v);
    } else if (!c) this.out("P", p, v);
    else this.out("V", p, v);
    K++; // by-pass ']'
    while (K < this.len) {
      a = this.s.charAt(K);
      if (
        a == "(" ||
        a == ";" ||
        a == ")" ||
        (a >= "A" && a <= "Z") ||
        a == "["
      )
        break;
      else K++;
    }
    return K;
  };
  mxG.P.prototype.parseProperty = function(K) {
    var a,
      p = "",
      c = 0;
    while (K < this.len && (a = this.s.charAt(K)) != "[") {
      if (a >= "A" && a <= "Z") p += a;
      K++;
    }
    while (K < this.len && this.s.charAt(K) == "[") {
      K = this.parseValue(p, K, c);
      c++;
    }
    return K;
  };
  mxG.P.prototype.parseNode = function(K) {
    var a;
    this.nc = 1;
    while (K < this.len) {
      switch ((a = this.s.charAt(K))) {
        case "(":
        case ";":
        case ")":
          return K;
        default:
          if (a >= "A" && a <= "Z") K = this.parseProperty(K);
          else K++;
      }
    }
    return K;
  };
  mxG.P.prototype.parseVariation = function(K) {
    var a = this.mainOnly ? 1 : 0;
    if (this.nv) {
      if (this.v.length) this.out("v=", "", "");
      this.nv = 0;
    } else this.out("v+", "", "");
    while (K < this.len)
      switch (this.s.charAt(K)) {
        case "(":
          if (a) K++;
          else return K;
          break;
        case ";":
          K++;
          K = this.parseNode(K);
          break;
        case ")":
          K++;
          if (this.nv) {
            if (this.v.length) this.out("v-", "", "");
          } else this.nv = 1;
          if (a) return this.len;
          break;
        default:
          K++;
      }
    return K;
  };
  mxG.P.prototype.parseSgf = function(s) {
    var K = 0;
    this.rN.Kid = [];
    this.rN.Focus = 0;
    this.nN = this.rN;
    this.v = [];
    this.nv = 0; // if 0, 1st node variation
    this.nc = 0; // if 1, create node
    this.s = s;
    this.len = this.s.length;
    while (K < this.len)
      if (this.s.charAt(K) == "(") {
        K++;
        K = this.parseVariation(K);
      } else K++;
    while (this.v.length) this.out("v-", "", "");
  };
}
// maxiGos v7 > mgos_rls.js
// go rules manager
if (!mxG.R) {
  mxG.R = function() {
    this.act = [""]; // action history ("" as "Play" or "A" as "Add")
    this.nat = ["E"]; // nature history ("B" as "Black", "W" as "White" or "E" as "Empty")
    this.x = [0]; // x coordinate of action
    this.y = [0]; // y coordinate of action
    this.o = [0]; // 0 if never taken, m if taken by m
  };
  mxG.R.prototype.init = function(DX, DY) {
    var i, j;
    this.play = 0; // action counter
    this.setup = 0; // last setup action number
    this.DX = DX; // number of column (19 for classic goban)
    this.DY = DY; // number of row (19 for classic goban)
    this.ban = []; // goban (each point contains last action done on this point)
    for (
      i = 1;
      i <= this.DX;
      i++ // prefer that indices start at 1 for lisibility
    ) {
      this.ban[i] = [];
      for (j = 1; j <= this.DY; j++) this.ban[i][j] = 0;
    }
    this.prisoners = { B: [0], W: [0] }; // number of prisoner taken by black and white
  };
  mxG.R.prototype.inGoban = function(x, y) {
    return x >= 1 && y >= 1 && x <= this.DX && y <= this.DY;
  };
  mxG.R.prototype.lib = function(nat, x, y) {
    // return 1 if(x,y) is a liberty, or is nat with liberties
    var k, km;
    if (!this.inGoban(x, y)) return 0;
    if (this.nat[this.ban[x][y]] == "E") return 1;
    if (this.nat[this.ban[x][y]] != nat) return 0;
    km = this.s.length;
    for (k = 0; k < km; k++) if (this.s[k].x == x && this.s[k].y == y) return 0;
    this.s[km] = { x: x, y: y };
    if (
      this.lib(nat, x, y - 1) ||
      this.lib(nat, x + 1, y) ||
      this.lib(nat, x, y + 1) ||
      this.lib(nat, x - 1, y)
    )
      return 1;
    return 0;
  };
  mxG.R.prototype.capture = function(nat, x, y) {
    // capture nat stones
    this.s = [];
    if (this.lib(nat, x, y)) return 0;
    var numOfPrisoner = this.s.length,
      pt;
    while (this.s.length) {
      pt = this.s.pop();
      this.o[this.ban[pt.x][pt.y]] = this.play;
      this.ban[pt.x][pt.y] = 0;
    }
    return numOfPrisoner;
  };
  mxG.R.prototype.place = function(nat, x, y) {
    // works even if the move is not valid
    // nat can be B, W, AB, AW, or AE
    // pNat: player nat, oNat: opponent nat
    this.play++;
    var act = nat.length > 1 ? "A" : "";
    var pNat = nat.substr(nat.length - 1, 1);
    var oNat = pNat == "B" ? "W" : pNat == "W" ? "B" : "E";
    var prisoners,
      m = this.play;
    this.act[m] = act;
    this.nat[m] = pNat;
    this.prisoners.B[m] = this.prisoners.B[m - 1];
    this.prisoners.W[m] = this.prisoners.W[m - 1];
    this.o[m] = 0;
    if (this.inGoban(x, y)) {
      this.x[m] = x;
      this.y[m] = y;
      if (act != "A") {
        // B or W
        this.ban[x][y] = m;
        prisoners = this.capture(oNat, x - 1, y);
        prisoners += this.capture(oNat, x + 1, y);
        prisoners += this.capture(oNat, x, y - 1);
        prisoners += this.capture(oNat, x, y + 1);
        if (!prisoners) {
          prisoners = this.capture(pNat, x, y); // suicide
          this.prisoners[oNat][m] += prisoners;
        } else this.prisoners[pNat][m] += prisoners;
      } // AB, AW or AE
      else {
        this.setup = m;
        this.ban[x][y] = pNat != "E" ? m : 0;
      }
    } else {
      this.x[m] = 0;
      this.y[m] = 0;
    }
  };
  mxG.R.prototype.back = function(play) {
    this.init(this.DX, this.DY);
    for (var k = 1; k <= play; k++)
      this.place(this.act[k] + this.nat[k], this.x[k], this.y[k]);
  };
  mxG.R.prototype.isOccupied = function(x, y) {
    return this.nat[this.ban[x][y]] != "E";
  };
  mxG.R.prototype.isOnlyOne = function(k, nat) {
    var n = 1,
      x = this.x[k],
      y = this.y[k];
    if (x > 1 && this.nat[this.ban[x - 1][y]] == nat) n++;
    if (y > 1 && this.nat[this.ban[x][y - 1]] == nat) n++;
    if (x < this.DX && this.nat[this.ban[x + 1][y]] == nat) n++;
    if (y < this.DY && this.nat[this.ban[x][y + 1]] == nat) n++;
    return n == 1;
  };
  mxG.R.prototype.hasOnlyOneLib = function(k) {
    var n = 0,
      x = this.x[k],
      y = this.y[k];
    if (x > 1 && this.nat[this.ban[x - 1][y]] == "E") n++;
    if (y > 1 && this.nat[this.ban[x][y - 1]] == "E") n++;
    if (x < this.DX && this.nat[this.ban[x + 1][y]] == "E") n++;
    if (y < this.DY && this.nat[this.ban[x][y + 1]] == "E") n++;
    return n == 1;
  };
  mxG.R.prototype.captureOnlyOne = function(k, nat) {
    return this.prisoners[nat][k] - this.prisoners[nat][k - 1] == 1;
  };
  mxG.R.prototype.isKo = function(nat, x, y) {
    // japanese ko only
    var m = this.play;
    if (m < 4) return 0;
    // pNat:player nat, oNat:opponent nat
    var pNat = nat.substr(nat.length - 1, 1),
      oNat = pNat == "B" ? "W" : pNat == "W" ? "B" : "E",
      xpred = this.x[m],
      ypred = this.y[m];
    return (
      ((xpred == x - 1 && ypred == y) ||
        (xpred == x && ypred == y - 1) ||
        (xpred == x + 1 && ypred == y) ||
        (xpred == x && ypred == y + 1)) &&
      this.isOnlyOne(m, oNat) &&
      this.hasOnlyOneLib(m) &&
      this.captureOnlyOne(m, oNat) &&
      pNat == this.nat[m - 1] &&
      oNat == this.nat[m]
    );
  };
  mxG.R.prototype.canCapture = function(nat, x, y) {
    this.s = [];
    if (this.lib(nat, x, y)) return 0;
    return this.s.length;
  };
  mxG.R.prototype.isLib = function(x, y) {
    return this.inGoban(x, y) && this.nat[this.ban[x][y]] == "E";
  };
  mxG.R.prototype.isSuicide = function(nat, x, y) {
    var m = this.play,
      pNat = nat.substr(nat.length - 1, 1),
      oNat = pNat == "B" ? "W" : pNat == "W" ? "B" : "E",
      s = 1,
      exNat = this.nat[m + 1],
      exBan = this.ban[x][y];
    this.nat[m + 1] = pNat;
    this.ban[x][y] = m + 1;
    if (
      this.isLib(x - 1, y) ||
      this.isLib(x, y - 1) ||
      this.isLib(x + 1, y) ||
      this.isLib(x, y + 1) ||
      this.canCapture(oNat, x - 1, y) ||
      this.canCapture(oNat, x, y - 1) ||
      this.canCapture(oNat, x + 1, y) ||
      this.canCapture(oNat, x, y + 1) ||
      !this.canCapture(pNat, x, y)
    )
      s = 0;
    this.ban[x][y] = exBan;
    this.nat[m + 1] = exNat;
    return s;
  };
  mxG.R.prototype.isValid = function(nat, x, y) {
    return (
      (!x && !y) ||
      !(
        this.inGoban(x, y) &&
        (this.isOccupied(x, y) ||
          this.isKo(nat, x, y) ||
          this.isSuicide(nat, x, y))
      )
    );
  };
  // some useful functions
  mxG.R.prototype.getBanNum = function(x, y) {
    return this.ban[x][y];
  };
  mxG.R.prototype.getBanNat = function(x, y) {
    return this.nat[this.ban[x][y]];
  };
  mxG.R.prototype.getNat = function(n) {
    return this.nat[n];
  };
  mxG.R.prototype.getX = function(n) {
    return this.x[n];
  };
  mxG.R.prototype.getY = function(n) {
    return this.y[n];
  };
  mxG.R.prototype.getAct = function(n) {
    return this.act[n];
  };
  mxG.R.prototype.getPrisoners = function(nat) {
    return this.prisoners[nat][this.play];
  };
  mxG.R.prototype.getO = function(n) {
    return this.o[n];
  };
}
// maxiGos v7 > mgos_scr.js
// screen output manager
// remember: css properties have priority on svg attributes
if (!mxG.S) {
  mxG.S = function(p) {
    this.p = p; // parent object: mxG.D[k]
    this.d = 23; // set it as soon as possible
    this.fs = 14; // set it as soon as possible
    this.stoneShadowWidth = 1;
  };
  mxG.S.prototype.star = function(x, y) {
    var DX = this.DX,
      DY = this.DY;
    var Ax = 4,
      Bx = DX + 1 - Ax,
      Cx = (DX + 1) >> 1;
    var Ay = 4,
      By = DY + 1 - Ay,
      Cy = (DY + 1) >> 1;
    var xok = 0,
      yok = 0;
    if (DX > 11 && (x == Ax || x == Bx)) xok = 1;
    if (DX & 1 && (DX > 15 || x == y) && x == Cx) xok = 1;
    if (DY > 11 && (y == Ay || y == By)) yok = 1;
    if (DY & 1 && (DY > 15 || x == y) && y == Cy) yok = 1;
    return xok && yok;
  };
  mxG.S.prototype.isLabel = function(m) {
    return /^\(*\|.*\|\)*$/.test(m);
  };
  mxG.S.prototype.removeLabelDelimiters = function(m) {
    return m.replace(/^(\(*)\|(.*)\|(\)*)$/, "$1$2$3");
  };
  mxG.S.prototype.isVariation = function(m) {
    return /^\(.*\)$/.test(m);
  };
  mxG.S.prototype.isVariationOnFocus = function(m) {
    return /^\(\([^()]*\)\)$/.test(m);
  };
  mxG.S.prototype.removeVariationDelimiters = function(m) {
    return m.replace(/^\(+([^()]*)\)+$/, "$1");
  };
  mxG.S.prototype.isMark = function(m) {
    return /^\(*_(CR|MA|SQ|TR)_\)*$/.test(m);
  };
  mxG.S.prototype.i2x = function(i) {
    return this.dw * (i - this.xl + 0.5) + this.gbsxl;
  };
  mxG.S.prototype.j2y = function(j) {
    return this.dh * (j - this.yt + 0.5) + this.gbsyt;
  };
  mxG.S.prototype.makeText = function(txt, i, j, o) {
    var s,
      x,
      y,
      dx,
      dy,
      c,
      cls,
      cls2 = "",
      wbk,
      hbk,
      w,
      h,
      dw2,
      dh2,
      dz,
      sw,
      sx;
    cls = o.cls;
    c = o.c;
    sw = o.sw;
    dz = this.grim + this.grip;
    txt += "";
    dx = i < 1 ? -dz : i > this.DX ? dz : 0;
    dy = j < 1 ? -dz : j > this.DY ? dz : 0;
    if (i < 1 || j < 1 || i > this.DX || j > this.DY) {
      dw2 = this.db / 2;
      dh2 = this.db / 2;
    } else {
      dw2 = this.dw / 2;
      dh2 = this.dh / 2;
    }
    x = this.dw * (i - this.xl + 1) - dw2 + this.gbsxl + dx;
    y = this.dh * (j - this.yt + 1) - dh2 + this.gbsyt + dy;
    s = "<text";
    if (cls) s += ' class="' + cls + '"';
    if (c !== undefined) {
      s += ' fill="' + c + '"';
      s += ' stroke="' + c + '"';
    }
    if (sw !== undefined) s += ' stroke-width="' + sw + '"';
    if (
      cls.indexOf("mxVertical") >= 0 &&
      (cls.indexOf("mxLen2") >= 0 || cls.indexOf("mxLen3") >= 0)
    ) {
      // japanese kanji
      // bug? in firefox (08/2019), cannot use css textLength+vertical-rl
      // bug? in safari (08/2019), cannot use css transform-box
      s += ' transform="translate(0,' + (y - 2) + ")";
      if (cls.indexOf("mxLen3") >= 0) s += " scale(1,0.33)";
      else s += " scale(1,0.5)";
      s += " translate(0,-" + y + ')"';
      s += ' writing-mode="vertical-rl"';
    } else if (txt.length > 1) {
      // using svg transform seems to be the safest way to shrink text width
      // translate(x,0) scale(sx,1) translate(-x,0)
      // is as matrix(sx,0,0,1,x*(1-sx),0)
      if (txt.length > 2) sx = 0.8;
      else sx = 0.9;
      s +=
        ' transform="matrix(' +
        sx +
        ",0,0,1," +
        Math.round(x * (1 - sx) * 100) / 100 +
        ',0)"';
    }
    // font-family, font-size and text-anchor are set in svg tag
    // bug, cannot use dominant-baseline:central everywhere
    // then just add 5 to y to center text verticaly
    s += ' x="' + x + '" y="' + (y + 5) + '">';
    s += txt;
    s += "</text>";
    return s;
  };
  mxG.S.prototype.make2dStone = function(c, x, y, r, o) {
    var s;
    s = '<circle class="mx' + c + '"';
    if (o.opacity < 1) s += 'fill-opacity="' + o.opacity + '"';
    s += ' fill="' + (c == "Black" ? "#000" : "#fff") + '"';
    s +=
      ' stroke="' +
      (c == "Black" && o.whiteStroke4Black ? "#fff" : "#000") +
      '"';
    s += ' cx="' + x + '" cy="' + y + '" r="' + r + '"/>';
    return s;
  };
  mxG.S.prototype.make3dStone1 = function(c, x, y, r, o) {
    var s = "",
      e = this.stoneShadowWidth;
    if (o.stoneShadowOn) {
      s += '<circle class="mx' + c + 'Shadow"';
      s += ' fill="rgba(0,0,0,0.2)"';
      s += ' cx="' + (x + e) + '" cy="' + (y + e) + '" r="' + r + '"/>';
    }
    s += '<circle class="mx' + c + '"';
    if (o.opacity < 1) s += 'fill-opacity="' + o.opacity + '"';
    s += ' fill="url(#' + this.p.n + c + 'RadialGradient)"';
    s += ' cx="' + x + '" cy="' + y + '" r="' + r + '"/>';
    return s;
  };
  mxG.S.prototype.make3dStone2 = function(c, x, y, r, o) {
    var s = "",
      a,
      rg,
      e = this.stoneShadowWidth;
    if (o.stoneShadowOn) {
      s += '<circle class="mx' + c + 'Shadow"';
      s += ' fill="rgba(0,0,0,0.2)"';
      s += ' cx="' + (x + e) + '" cy="' + (y + e) + '" r="' + r + '"/>';
    }
    s += '<circle class="mx' + c + '"';
    if (o.opacity < 1) s += 'fill-opacity="' + o.opacity + '"';
    s += ' fill="url(#' + this.p.n + c + 'RadialGradientA)"';
    s += ' cx="' + x + '" cy="' + y + '" r="' + r + '"/>';
    s += '<circle class="mx' + c + '2"';
    if (o.opacity < 1) s += 'fill-opacity="' + o.opacity + '"';
    rg = "B";
    if (c == "White") {
      a = this.p.alea8[Math.round((x + y) / r / 2) % 8];
      if (a) rg += a;
    }
    s += ' fill="url(#' + this.p.n + c + "RadialGradient" + rg + ')"';
    s += ' cx="' + x + '" cy="' + y + '" r="' + r + '"/>';
    return s;
  };
  mxG.S.prototype.makeStone = function(c, x, y, r, o) {
    if (o.in3dOn)
      return this["make3dStone" + (this.p.specialStoneOn ? 2 : 1)](
        c,
        x,
        y,
        r,
        o
      );
    else return this.make2dStone(c, x, y, r, o);
  };
  mxG.S.prototype.makeTextOnAloneStone = function(txt, x, y, d, c, o) {
    // assume txt is a number
    var s, x, y;
    txt += "";
    s = "<text";
    s += ' text-anchor="middle"';
    s += ' fill="' + c + '"';
    s += ' stroke="' + c + '"';
    s += ' stroke-width="0.5"';
    if (txt.length > 1) {
      if (o.vertical) {
        s += ' transform="translate(0,' + (y - 2) + ")";
        if (txt.length > 2) s += " scale(1,0.33)";
        else s += " scale(1,0.5)";
        s += " translate(0,-" + y + ')"';
        s += ' writing-mode="vertical-rl"';
      } else {
        // using svg transform seems to be the safest way to shrink text width
        s += ' transform="translate(' + x + ",0)";
        if (txt.length > 2) s += " scale(0.8,1)";
        else s += " scale(0.9,1)";
        s += " translate(-" + x + ',0)"';
      }
    }
    // font-family, font-size and text-anchor are set in svg tag
    // bug, cannot use dominant-baseline:central everywhere
    // then just add 5 to y to center text verticaly
    s += ' x="' + x + '" y="' + (y + 5) + '">';
    s += txt;
    s += "</text>";
    return s;
  };
  mxG.S.prototype.makeTextAfterAloneStone = function(txt, d, c) {
    var s, x, y;
    txt += "";
    x = d + d / 8;
    y = d / 2;
    s = '<text class="mxAfterAloneStone"';
    s += ' fill="' + c + '"';
    s += ' stroke="' + c + '"';
    s += ' stroke-width="0.5"';
    // font-family and font-size are set in svg tag
    // bug, cannot use dominant-baseline:central everywhere
    // then just add 5 to y to center text verticaly
    s += ' x="' + x + '" y="' + (y + 5) + '">';
    s += txt;
    s += "</text>";
    return s;
  };
  mxG.S.prototype.makeAloneStone = function(nat, n, o) {
    var s,
      d = this.d,
      dd = d + 2,
      x = dd / 2,
      y = dd / 2,
      z,
      c,
      t;
    z = o.in3dOn && o.stoneShadowOn ? this.stoneShadowWidth : 0;
    s = "<svg";
    s += ' xmlns="http://www.w3.org/2000/svg"';
    // final viewBox, width and height will be modified when rendering
    s +=
      ' viewBox="' +
      -z +
      " " +
      -z +
      " " +
      (dd + 2 * z) +
      " " +
      (dd + 2 * z) +
      '"';
    s += ' width="' + (dd + 2 * z) + '" height="' + (dd + 2 * z) + '"';
    s += ' font-family="arial,sans-serif"';
    s += ' font-size="' + this.fs + '"';
    s += ">";
    c = nat == "B" ? "Black" : nat == "W" ? "White" : null;
    if (c) {
      o.opacity = 1;
      s += this.makeStone(c, x, y, d / 2, o);
      if (n)
        s += this.makeTextOnAloneStone(
          n,
          dd / 2,
          dd / 2,
          dd,
          nat == "B" ? "White" : "Black",
          o
        );
    }
    s += "</svg>";
    return s;
  };
  mxG.S.prototype.makeAloneStoneAndText = function(nat, n, v, o) {
    var s,
      d = this.d,
      dd = d + 2,
      x = dd / 2,
      y = dd / 2,
      z,
      c,
      t;
    z = o.in3dOn && o.stoneShadowOn ? this.stoneShadowWidth : 0;
    s = "<svg";
    s += ' xmlns="http://www.w3.org/2000/svg"';
    // final viewBox, width and height will be modified when rendering
    s +=
      ' viewBox="' +
      -z +
      " " +
      -z +
      " " +
      (dd + 2 * z) +
      " " +
      (dd + 2 * z) +
      '"';
    s += ' width="100%" height="100%"';
    s += ' font-family="arial,sans-serif"';
    s += ' font-size="' + this.fs + '"';
    s += ">";
    c = nat == "B" ? "Black" : nat == "W" ? "White" : null;
    if (v) {
      t = this.p.local(c ? c : "") + (n ? (c ? " " : "") + n : "") + v;
      s += "<title>" + t + "</title>";
    }
    if (c) {
      o.opacity = 1;
      s += this.makeStone(c, x, y, d / 2, o);
      if (n)
        s += this.makeTextOnAloneStone(
          n,
          dd / 2,
          dd / 2,
          dd,
          nat == "B" ? "White" : "Black",
          o
        );
      if (v) s += this.makeTextAfterAloneStone(v, dd, "Black");
    }
    s += "</svg>";
    return s;
  };
  mxG.S.prototype.makeTextSomewhere = function(txt, x, y, c, centered) {
    // x: center of the text if centered, beginning of the text otherwise
    // y: center of the text
    var s;
    txt += "";
    s = '<text class="mxTextSomewhere"';
    s += ' fill="' + c + '"';
    s += ' stroke="' + c + '"';
    s += ' stroke-width="0.5"';
    if (centered) s += ' text-anchor="middle"';
    // font-family and font-size are set in svg tag
    // bug, cannot use dominant-baseline:central everywhere
    // then just add 5 to y to center text verticaly
    s += ' x="' + x + '" y="' + (y + 5) + '">';
    s += txt;
    s += "</text>";
    return s;
  };
  mxG.S.prototype.makeNotSeen = function(a, o) {
    var k,
      km,
      s = "",
      nw,
      h4ns,
      title = "",
      i,
      j,
      c,
      x,
      y,
      xo;
    var d, dd, ddd, z;
    d = this.d;
    dd = this.d + 2;
    z = o.in3dOn && o.stoneShadowOn ? this.stoneShadowWidth : 0;
    ddd = dd + 2 * z;
    km = a.length;
    for (k = 0; k < km; k++) {
      if (k) title += ", ";
      title +=
        this.p.local(a[k].nat == "B" ? "Black" : "White") +
        " " +
        a[k].n +
        " " +
        a[k].t;
      if (a[k].nato)
        title +=
          " " +
          this.p.local(a[k].nato == "B" ? "Black" : "White") +
          " " +
          a[k].no;
    }
    // compute h4ns
    nw = Math.floor(this.w / (4 * ddd));
    if (nw < 1) nw = 1;
    nl = Math.ceil(km / nw);
    h4ns = nl * ddd;
    xo = (this.w - nw * 4 * ddd + ddd) / 2;
    // make svg
    s = "<svg";
    s += ' xmlns="http://www.w3.org/2000/svg"'; // need it for "Image" component
    s += ' id="' + this.p.n + 'NotSeenSvg" class="mxNotSeenSvg"';
    s += ' viewBox="0 0 ' + this.w + " " + h4ns + '"';
    s += ' width="' + this.w + '" height="' + h4ns + '"';
    s += ' stroke-linecap="square"';
    s += ' font-family="arial,sans-serif"';
    s += ' font-size="' + this.fs + '"';
    s += ' font-weight="400"';
    s += ">";
    s += "<title>" + title + "</title>"; // accessibility
    if (this.in3dOn) {
      s += "<defs>";
      s += this.makeGradient("Black");
      s += this.makeGradient("White");
      s += "</defs>";
    }
    for (k = 0; k < km; k++) {
      i = k % nw;
      j = Math.floor(k / nw);
      c = a[k].nat == "B" ? "Black" : "White";
      o.opacity = 1;
      x = xo + i * ddd * 4 + ddd / 2;
      y = j * ddd + ddd / 2;
      s += this.makeStone(c, x, y, d / 2, o);
      if (a[k].n)
        s += this.makeTextOnAloneStone(
          a[k].n,
          x,
          y,
          dd,
          a[k].nat == "B" ? "White" : "Black",
          o
        );
      if (a[k].t) {
        if (a[k].nato)
          s += this.makeTextSomewhere(a[k].t, x + ddd, y, "Black", 1);
        else
          s += this.makeTextSomewhere(
            a[k].t,
            x + ddd / 2 + d / 8,
            y,
            "Black",
            0
          );
      }
      if (a[k].nato) {
        c = a[k].nato == "B" ? "Black" : "White";
        o.opacity = 1;
        x = xo + (i * 4 + 2) * ddd + ddd / 2;
        y = j * ddd + ddd / 2;
        s += this.makeStone(c, x, y, d / 2, o);
        if (a[k].no)
          s += this.makeTextOnAloneStone(
            a[k].no,
            x,
            y,
            dd,
            a[k].nato == "B" ? "White" : "Black",
            o
          );
      }
    }
    s += "</svg>";
    return s;
  };
  mxG.S.prototype.makeSelectTool = function() {
    var s,
      d = this.d,
      dd = d + 2,
      x = dd / 2,
      y = dd / 2,
      z,
      c = "#000";
    z = (d * 3) / 4;
    s = "<svg";
    s += ' xmlns="http://www.w3.org/2000/svg"';
    s += ' viewBox="0 0 ' + dd + " " + dd + '"';
    s += ' width="100%" height="100%"';
    s += ">";
    s += '<rect stroke-dasharray="2"';
    s += ' fill="none" stroke="' + c + '"';
    s += ' x="' + (x - z / 2) + '" y="' + (y - z / 2) + '"';
    s += ' width="' + z + '" height="' + z + '"/>';
    s += "</svg>";
    return s;
  };
  mxG.S.prototype.makeViewTool = function() {
    var s,
      d = this.d,
      dd = d + 2,
      x = dd / 2,
      y = dd / 2,
      z,
      c = "#000";
    z = (d * 3) / 4;
    s = "<svg";
    s += ' xmlns="http://www.w3.org/2000/svg"';
    s += ' viewBox="0 0 ' + dd + " " + dd + '"';
    s += ' width="100%" height="100%"';
    s += ">";
    s += "<rect";
    s += ' fill="none" stroke="' + c + '"';
    s += ' x="' + (x - z / 2) + '" y="' + (y - z / 2) + '"';
    s += ' width="' + z + '" height="' + z + '"/>';
    s += "<rect";
    s += ' fill="none" stroke="' + c + '"';
    s += ' x="' + x + '" y="' + (y - z / 2) + '"';
    s += ' width="' + z / 2 + '" height="' + z / 2 + '"/>';
    s += "</svg>";
    return s;
  };
  mxG.S.prototype.makeSetupTool = function(nat, o) {
    var s,
      d = this.d,
      dd = d + 2,
      x = dd / 2,
      y = dd / 2,
      c1,
      c2;
    if (nat == "AB") {
      c1 = "Black";
      c2 = "White";
    } else {
      c1 = "White";
      c2 = "Black";
    }
    s = "<svg";
    s += ' xmlns="http://www.w3.org/2000/svg"';
    s += ' xmlns:xlink="http://www.w3.org/1999/xlink"';
    s += ' viewBox="0 0 ' + dd + " " + dd + '"';
    s += ' width="100%" height="100%"';
    s += ">";
    s += "<defs>";
    s += '<clipPath id="' + this.p.n + 'SetupBlackClip"><path';
    s += ' d="M0 0L' + x + " 0L" + x + " " + dd + "L0 " + dd + 'Z"';
    s += "/></clipPath>";
    s += '<clipPath id="' + this.p.n + 'SetupWhiteClip">';
    s += "<path";
    s +=
      ' d="M' +
      dd +
      " 0L" +
      x +
      " 0L" +
      x +
      " " +
      dd +
      "L" +
      dd +
      " " +
      dd +
      'Z"';
    s += "/>";
    s += "</clipPath>";
    s += "</defs>";
    s += "<circle";
    s += ' clip-path="url(#' + this.p.n + 'SetupBlackClip)"';
    if (o.in3dOn) s += ' fill="url(#' + this.p.n + c1 + 'RadialGradient)"';
    else s += ' fill="' + c1 + '" stroke="#000"';
    s += ' cx="' + x + '" cy="' + y + '" r="' + d / 2 + '"';
    s += "/>";
    s += "<circle";
    s += ' clip-path="url(#' + this.p.n + 'SetupWhiteClip)"';
    if (o.in3dOn) s += ' fill="url(#' + this.p.n + c2 + 'RadialGradient)"';
    else s += ' fill="' + c2 + '" stroke="#000"';
    s += ' cx="' + x + '" cy="' + y + '" r="' + d / 2 + '"';
    s += "/>";
    s += "</svg>";
    return s;
  };
  mxG.S.prototype.makeMarkOnLast = function(c, x, y, cls) {
    var s, z;
    z = this.d / 6;
    s = '<rect class="' + cls + '"';
    s += ' fill="' + c + '"';
    s += ' x="' + (x - z) + '" y="' + (y - z) + '"';
    s += ' width="' + z * 2 + '" height="' + z * 2 + '"/>';
    return s;
  };
  mxG.S.prototype.makeMark = function(c, x, y, cls) {
    var s,
      x1,
      y1,
      x2,
      y2,
      z = this.d * 0.28;
    x1 = x - z;
    y1 = y - z;
    x2 = x + z;
    y2 = y + z;
    s = '<path class="' + cls + '"';
    s += ' stroke-width="1.5" stroke="' + c + '" fill="none"';
    s +=
      ' d="M' +
      x1 +
      " " +
      y1 +
      "L" +
      x2 +
      " " +
      y2 +
      "M" +
      x1 +
      " " +
      y2 +
      "L" +
      x2 +
      " " +
      y1 +
      '"/>';
    return s;
  };
  mxG.S.prototype.makeCircle = function(c, x, y, cls) {
    var s,
      z = this.d * 0.27;
    s = '<circle class="' + cls + '"';
    s += ' stroke-width="1.5" stroke="' + c + '" fill="none"';
    s += ' cx="' + x + '" cy="' + y + '" r="' + z + '"/>';
    return s;
  };
  mxG.S.prototype.makeTriangle = function(c, x, y, cls) {
    var s,
      x1,
      y1,
      x2,
      y2,
      x3,
      y3,
      z = this.d * 0.32;
    x1 = x;
    y1 = y - z;
    x2 = x - z;
    y2 = y + z * 0.8;
    x3 = x + z;
    y3 = y + z * 0.8;
    s = '<polygon class="' + cls + '"';
    s += ' stroke-width="1.5" stroke="' + c + '" fill="none"';
    s +=
      ' points="' +
      x1 +
      " " +
      y1 +
      " " +
      x2 +
      " " +
      y2 +
      " " +
      x3 +
      " " +
      y3 +
      '"/>';
    return s;
  };
  mxG.S.prototype.makeSquare = function(c, x, y, cls) {
    var s,
      z = this.d * 0.27;
    s = '<rect class="' + cls + '"';
    s += ' stroke-width="1.5" stroke="' + c + '" fill="none"';
    s += ' x="' + (x - z) + '" y="' + (y - z) + '"';
    s += ' width="' + z * 2 + '" height="' + z * 2 + '"/>';
    return s;
  };
  mxG.S.prototype.makeAloneMark = function(m) {
    var s,
      d = this.d,
      dd = d + 2,
      x = dd / 2,
      y = dd / 2,
      c = "#000",
      cls = "mxTool";
    s = "<svg";
    s += ' xmlns="http://www.w3.org/2000/svg"';
    s += ' viewBox="0 0 ' + dd + " " + dd + '"';
    s += ' width="100%" height="100%"';
    s += ">";
    switch (m) {
      case "Circle":
        s += this.makeCircle(c, x, y, cls);
        break;
      case "Mark":
        s += this.makeMark(c, x, y, cls);
        break;
      case "Square":
        s += this.makeSquare(c, x, y, cls);
        break;
      case "Triangle":
        s += this.makeTriangle(c, x, y, cls);
        break;
    }
    s += "</svg>";
    return s;
  };
  mxG.S.prototype.makeAloneToolText = function(txt) {
    // for edit tool only
    // assume text width is smaller than dd
    var s,
      d = this.d,
      dd = d + 2,
      x = dd / 2,
      y = dd / 2,
      c = "#000";
    s = "<svg";
    s += ' xmlns="http://www.w3.org/2000/svg"';
    s += ' viewBox="0 0 ' + dd + " " + dd + '"';
    s += ' width="100%" height="100%"';
    s += ' font-family="arial,sans-serif"';
    s += ' font-size="' + this.fs + '"';
    s += ">";
    s += "<text";
    s += ' text-anchor="middle"';
    s += ' fill="' + c + '"';
    s += ' x="' + x + '" y="' + (y + 5) + '">';
    s += txt;
    s += "</text>";
    s += "</svg>";
    return s;
  };
  mxG.S.prototype.makeTerritoryMark = function(a, x, y, cls) {
    var c = a == "_TB_" ? "Black" : "White",
      o;
    if (this.p.territoryMark == "MA") return this.makeMark(c, x, y, cls);
    o = { opacity: 1, in3dOn: this.in3dOn, stoneShadowOn: this.stoneShadowOn };
    return this.makeStone(c, x, y, this.d / 5, o);
  };
  mxG.S.prototype.makeFocusMark = function(x, y) {
    var s,
      z = this.d / 2;
    s += '<rect class="mxFocusMark" stroke="#000" fill="none"';
    s += ' x="' + (x - z) + '" y="' + (y - z) + '"';
    s += ' width="' + z * 2 + '" height="' + z * 2 + '"/>';
    return s;
  };
  mxG.S.prototype.makeNumberOrMarkOrLabel = function(i, j, nat, a) {
    var s = "",
      c,
      cls,
      x,
      y;
    cls = "mxOn" + (nat == "B" ? "Black" : nat == "W" ? "White" : "Empty");
    cls += " mx" + i + "_" + j;
    c = nat == "B" ? "#fff" : "#000";
    x = this.i2x(i);
    y = this.j2y(j);
    if (a == "_TB_" || a == "_TW_")
      s += this.makeTerritoryMark(a, x, y, "mxTerritoryMark " + cls);
    else if (a == "_ML_")
      s += this.makeMarkOnLast(c, x, y, "mxMarkOnLast " + cls);
    else if (a) {
      if (/^[0-9]+$/.test(a)) {
        cls += " mxNumber";
        if (this.oldJapaneseNumberingOn) {
          a = this.k2okanji(parseInt(a + ""));
          cls += " mxVertical";
          cls += " mxLen" + (a + "").length;
        }
      } else {
        if (this.isMark(a)) cls += " mxMark";
        else if (this.isLabel(a)) {
          cls += " mxLabel";
          a = this.removeLabelDelimiters(a);
        }
        if (this.isVariation(a)) {
          cls += " mxVariation";
          if (this.isVariationOnFocus(a)) cls += " mxOnFocus";
          a = this.removeVariationDelimiters(a);
        }
      }
      switch (a) {
        case "_MA_":
          s += this.makeMark(c, x, y, cls);
          break;
        case "_TR_":
          s += this.makeTriangle(c, x, y, cls);
          break;
        case "_SQ_":
          s += this.makeSquare(c, x, y, cls);
          break;
        case "_CR_":
          s += this.makeCircle(c, x, y, cls);
          break;
        default:
          s += this.makeText(a, i, j, { c: c, cls: cls, sw: "0.5" });
      }
    }
    return s;
  };
  mxG.S.prototype.k2katakana = function(ko) {
    var k = this.DX - ko,
      s;
    s = "イロハニホヘトチリヌルヲワカヨタレソツ";
    s += "ネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス";
    return k < s.length ? s.charAt(k) : "";
  };
  mxG.S.prototype.k2kanji = function(k) {
    var s = "一二三四五六七八九十";
    if (k < 11) return s.charAt(k - 1);
    if (k < 20) return "十" + s.charAt(k - 11);
    return "";
  };
  mxG.S.prototype.k2okanji = function(s) {
    var k, ko, a, an, b, bn, c, cn;
    s += "";
    k = parseInt(s);
    if (!k) return s;
    if (k < 20) return this.k2kanji(k);
    a = Math.floor(k / 100);
    b = Math.floor(k / 10) - a * 10;
    c = k - b * 10 - a * 100;
    if (a == 0) an = "";
    else if (a == 1) an = "口";
    else if (a == 2) an = "△";
    else if (a == 3) an = "◯";
    else an = "⊙";
    if (b == 0) bn = "";
    else if (b == 1) bn = "十";
    else if (b == 2) bn = "卄";
    // {if(android||ios) bn="二";else bn="〹";}?
    else if (b == 3) bn = "卅";
    // {if(android||ios) bn="三";else bn="〺";}?
    else bn = this.k2n(b);
    if (c == 0) cn = b < 4 ? "" : "十";
    else if (b == c && b > 3) cn = "〻";
    // if(android) cn="々" also possible (too modern?)
    else cn = this.k2kanji(c);
    return an + bn + cn;
  };
  mxG.S.prototype.k2n = function(k) {
    if (this.oldJapaneseIndicesOn || this.japaneseIndicesOn)
      return this.k2okanji(k);
    return this.DY + 1 - k + "";
  };
  mxG.S.prototype.k2c = function(k) {
    if (this.oldJapaneseIndicesOn) return this.k2katakana(k);
    if (this.japaneseIndicesOn) return k + "";
    var r = ((k - 1) % 25) + 1;
    return (
      String.fromCharCode(r + (r > 8 ? 65 : 64)) + (k > 25 ? (k - r) / 25 : "")
    );
  };
  mxG.S.prototype.getIndices = function(x, y) {
    if (x == 0 && y > 0 && y <= this.DY) return this.k2n(y);
    if (y == 0 && x > 0 && x <= this.DX) return this.k2c(x);
    if (x == this.DX + 1 && y > 0 && y <= this.DY) return this.k2n(y);
    if (y == this.DY + 1 && x > 0 && x <= this.DX) return this.k2c(x);
    return "";
  };
  mxG.S.prototype.makeIndices = function() {
    var s, i, j, cls1, cls2, m;
    cls1 = "mxIndice mxHorizontal";
    if (this.japaneseIndicesOn || this.oldJapaneseIndicesOn)
      cls2 = "mxIndice mxVertical";
    else cls2 = cls1;
    s = '<g class="mxIndices" fill="#000" stroke="#000" stroke-width="0.5">';
    if (this.xl == 1) {
      i = 0;
      for (j = this.yt; j <= this.yb; j++) {
        m = this.getIndices(i, j);
        s += this.makeText(m, i, j, { cls: cls2 + " mxLen" + m.length });
      }
    }
    if (this.yt == 1) {
      j = 0;
      for (i = this.xl; i <= this.xr; i++) {
        m = this.getIndices(i, j);
        s += this.makeText(m, i, j, { cls: cls1 + " mxLen" + m.length });
      }
    }
    if (this.xr == this.DX) {
      i = this.DX + 1;
      for (j = this.yt; j <= this.yb; j++) {
        m = this.getIndices(i, j);
        s += this.makeText(m, i, j, { cls: cls2 + " mxLen" + m.length });
      }
    }
    if (this.yb == this.DY) {
      j = this.DY + 1;
      for (i = this.xl; i <= this.xr; i++) {
        m = this.getIndices(i, j);
        s += this.makeText(m, i, j, { cls: cls1 + " mxLen" + m.length });
      }
    }
    s += "</g>";
    return s;
  };
  mxG.S.prototype.gridUnder = function(i, j, nat, str) {
    if (str != "_TB_" && str != "_TW_") {
      if (nat == "B" || nat == "W") return 0;
      if (
        str &&
        (this.isMark(str) || this.isLabel(str) || this.isVariation(str))
      )
        return 0;
    }
    return 1;
  };
  mxG.S.prototype.makeGrid = function(vNat, vStr) {
    var s = "",
      m,
      i,
      j,
      k,
      x,
      y;
    s += '<g class="mxGobanLines" stroke="#000">';
    for (i = this.xl; i <= this.xr; i++) {
      x = this.i2x(i);
      y = (this.yt == 1 ? this.dh / 2 : 0) + this.gbsyt;
      s += '<path class="mxGobanLine"';
      s += ' d="M' + x + " " + y;
      if (this.eraseGridUnder) {
        m = "M";
        for (j = this.yt; j <= this.yb; j++) {
          k = this.p.xy(i, j);
          if (this.gridUnder(i, j, vNat[k], vStr[k])) {
            if (m == "M") {
              if (j > this.yt) {
                y = this.gbsyt + (j - this.yt) * this.dh;
                s += m + x + " " + y;
              }
              m = "V";
            }
          } else {
            if (m == "V") {
              // j > yt
              y = this.gbsyt + (j - this.yt) * this.dh;
              s += m + y;
              m = "M";
            }
          }
        }
      } else m = "V";
      y =
        this.gbsyt +
        (this.yb - this.yt + 1) * this.dh -
        (this.yb == this.DY ? this.dh / 2 : 0);
      if (m == "V") s += m + y;
      else s += m + x + " " + y;
      s += '"/>';
    }
    for (j = this.yt; j <= this.yb; j++) {
      x = (this.xl == 1 ? this.dw / 2 : 0) + this.gbsxl;
      y = this.j2y(j);
      s += '<path class="mxGobanLine"';
      s += ' d="M' + x + " " + y;
      if (this.eraseGridUnder) {
        m = "M";
        for (i = this.xl; i <= this.xr; i++) {
          k = this.p.xy(i, j);
          if (this.gridUnder(i, j, vNat[k], vStr[k])) {
            if (m == "M") {
              if (i > this.xl) {
                x = this.gbsxl + (i - this.xl) * this.dw;
                s += m + x + " " + y;
              }
              m = "H";
            }
          } else {
            if (m == "H") {
              // i > xl
              x = this.gbsxl + (i - this.xl) * this.dw;
              s += m + x;
              m = "M";
            }
          }
        }
      } else m = "H";
      x =
        this.gbsxl +
        (this.xr - this.xl + 1) * this.dw -
        (this.xr == this.DX ? this.dw / 2 : 0);
      if (m == "H") s += m + x;
      else s += m + x + " " + y;
      s += '"/>';
    }
    s += "</g>";
    s += '<g class="mxStars" fill="#000" stroke="#000">';
    for (i = this.xl; i <= this.xr; i++)
      for (j = this.yt; j <= this.yb; j++)
        if (this.star(i, j)) {
          k = this.p.xy(i, j);
          if (!this.eraseGridUnder || this.gridUnder(i, j, vNat[k], vStr[k])) {
            s += '<circle class="mxStar mxStar' + i + "_" + j + '"';
            s += ' cx="' + this.i2x(i) + '" cy="' + this.j2y(j) + '" r="3"/>';
          }
        }
    s += "</g>";
    return s;
  };
  mxG.S.prototype.makeBackground = function(r) {
    var s, x, y, a, b, cls;
    b = this.indicesOn ? this.gobp + this.db + this.grim : 0; // indices width
    if (r == "Outer") {
      // always indicesOn in this case
      x = this.xl == 1 ? this.gobm : this.dw * (1 - this.xl) - b;
      y = this.yt == 1 ? this.gobm : this.dh * (1 - this.yt) - b;
      a = this.grip + b;
      w = this.dw * this.DX + a * 2;
      h = this.dh * this.DY + a * 2;
    } else if (r == "Inner") {
      x = this.xl == 1 ? this.gobm + b : this.dw * (1 - this.xl);
      y = this.yt == 1 ? this.gobm + b : this.dh * (1 - this.yt);
      a = this.grip;
      w = this.dw * this.DX + a * 2;
      h = this.dh * this.DY + a * 2;
    } // whole svg
    else {
      x = 0;
      y = 0;
      w = this.w;
      h = this.h;
    }
    cls = "mxGobanBackground";
    cls += this.indicesOn ? " mxWithIndices" : "";
    cls += " mx" + r + "Rect";
    s = '<rect class="' + cls + '"';
    s += ' fill="none" stroke="none"';
    s += ' x="' + x + '" y="' + y + '"';
    s += ' width="' + w + '" height="' + h + '"/>';
    return s;
  };
  mxG.S.prototype.getWRatio = function() {
    // get ratio from goban svg to deal the case where no css
    var b = this.p.getE("GobanSvg").getBoundingClientRect();
    return this.w / b.width;
  };
  mxG.S.prototype.getHRatio = function() {
    // get ratio from goban svg to deal the case where no css
    var b = this.p.getE("GobanSvg").getBoundingClientRect();
    return this.h / b.height;
  };
  mxG.S.prototype.getC = function(ev) {
    var x,
      y,
      c = this.ig.getMClick(ev);
    c.x = c.x * this.getWRatio() - this.gbsxl;
    c.y = c.y * this.getHRatio() - this.gbsyt;
    x = Math.max(
      Math.min(Math.floor(c.x / this.dw) + this.xl, this.xr),
      this.xl
    );
    y = Math.max(
      Math.min(Math.floor(c.y / this.dh) + this.yt, this.yb),
      this.yt
    );
    return { x: x, y: y };
  };
  mxG.S.prototype.setMagicGobanWidth = function(e) {
    // using pointsNumMax (number of points in a line of a reference goban)
    // calculate a reduction ratio wr used to display a small gobans or part of a goban
    // with stones of the same diameter as the stone diameter of a reference goban
    // the reduction is applied to e which is ig or one of its ancestors
    var wr, z;
    if (this.xr - this.xl + 1 <= this.pointsNumMax) {
      z = this.gbsxl + this.gbsxr;
      if (!this.indicesOn) {
        if (this.xl != 1) z += this.gobp + this.db + this.grim;
        if (this.xr != this.DX) z += this.gobp + this.db + this.grim;
      }
      wr = (this.w / (this.dw * this.pointsNumMax + z)) * 100;
    } else wr = 100; // if too large goban, do as if this.pointsNumMax=0
    e.style.width = wr + "%";
    this.wr = wr;
  };
  mxG.S.prototype.makeGradient1 = function(c) {
    // glass stones
    var s, r, c1, c2, c3;
    r = c == "Black" ? 50 : 100;
    c1 = c == "Black" ? "#999" : "#fff";
    c2 = c == "Black" ? "#333" : "#ccc";
    c3 = c == "Black" ? "#000" : "#333";
    s = '<radialGradient id="' + this.p.n + c + 'RadialGradient"';
    s += ' class="mx' + c + 'RadialGradient"';
    s += ' cx="33%" cy="33%" r="' + r + '%">';
    s += '<stop stop-color="' + c1 + '" offset="0"/>';
    s += '<stop stop-color="' + c2 + '" offset="0.5"/>';
    s += '<stop stop-color="' + c3 + '" offset="1"/>';
    s += "</radialGradient>";
    return s;
  };
  mxG.S.prototype.makeShellEffect = function(o) {
    var s,
      s1 = '<stop stop-color="#000" offset="',
      s2 = '" stop-opacity="',
      s3 = '"/>';
    s = s1 + (o - 0.03) + s2 + "0" + s3;
    s += s1 + (o - 0.02) + s2 + "0.0125" + s3;
    s += s1 + o + s2 + "0.0375" + s3;
    s += s1 + (o + 0.02) + s2 + "0.0125" + s3;
    s += s1 + (o + 0.03) + s2 + "0" + s3;
    return s;
  };
  mxG.S.prototype.makeGradient2 = function(c) {
    // slate and shell stones
    var s, k, l, rg;
    s = this.makeGradient1(c);
    s += '<radialGradient id="' + this.p.n + c + 'RadialGradientA"';
    s += ' class="mx' + c + 'RadialGradientA"';
    if (c == "Black") {
      s += ' cx="50%" cy="50%" r="50%">';
      s += '<stop stop-color="#aaa" offset="0.8"/>';
      s += '<stop stop-color="#666" offset="1"/>';
    } else {
      s += ' cx="33%" cy="33%" r="100%">';
      s += '<stop stop-color="#fff" offset="0"/>';
      s += '<stop stop-color="#ccc" offset="0.5"/>';
      s += '<stop stop-color="#333" offset="1"/>';
    }
    s += "</radialGradient>";
    if (c == "Black") {
      s += '<radialGradient id="' + this.p.n + c + 'RadialGradientB"';
      s += ' class="mx' + c + 'RadialGradientB"';
      s += ' cx="90%" cy="90%" r="100%">';
      s += '<stop stop-color="#000" offset="0.6" stop-opacity="1"/>';
      s += '<stop stop-color="#000" offset="1" stop-opacity="0"/>';
      s += "</radialGradient>";
    } else {
      for (k = 0; k < 8; k++) {
        rg = "B";
        if (k) rg += k;
        s +=
          '<radialGradient id="' + this.p.n + c + "RadialGradient" + rg + '"';
        s += ' class="mx' + c + 'RadialGradientB"';
        switch (k) {
          case 0:
            s += ' cx="0%" cy="100%" r="120%">';
            break;
          case 1:
            s += ' cx="50%" cy="100%" r="120%">';
            break;
          case 2:
            s += ' cx="100%" cy="100%" r="120%">';
            break;
          case 3:
            s += ' cx="100%" cy="50%" r="120%">';
            break;
          case 4:
            s += ' cx="100%" cy="0%" r="120%">';
            break;
          case 5:
            s += ' cx="50%" cy="0%" r="120%">';
            break;
          case 6:
            s += ' cx="0%" cy="0%" r="120%">';
            break;
          case 7:
            s += ' cx="0%" cy="50%" r="120%">';
            break;
        }
        for (l = 0.05; l < 1; l = l + 0.15) s += this.makeShellEffect(l);
        s += "</radialGradient>";
      }
    }
    return s;
  };
  mxG.S.prototype.makeGradient = function(c) {
    return this["makeGradient" + (this.p.specialStoneOn ? 2 : 1)](c);
  };
  mxG.S.prototype.addAnimatedGoban = function(c) {
    var s,
      tpl,
      list,
      k,
      km,
      co,
      xo,
      yo,
      xn,
      yn,
      z,
      r = this.d / 2,
      o;
    s = '<svg viewBox="0 0 ' + this.w + " " + this.h + '"';
    s += ' xmlns="http://www.w3.org/2000/svg"';
    s += ' width="100%" height="100%"';
    s += ' class="mxAnimatedGobanSvg"';
    s += ">";
    co = c.nat == "B" ? "Black" : "White";
    xo = c.nat == "B" ? this.w - r : r;
    yo = c.nat == "B" ? this.h - r : r;
    xn = this.i2x(c.x) - xo;
    yn = this.j2y(c.y) - yo;
    o = { opacity: 1, in3dOn: this.in3dOn, stoneShadowOn: this.stoneShadowOn };
    s += this.makeStone(co, xo, yo, this.d / 2, o);
    s += "</svg>";
    tpl = document.createElement("template");
    tpl.innerHTML = s;
    list = tpl.content.querySelectorAll("circle");
    km = list.length;
    z = "transform " + this.p.animatedStoneTime / 1000 + "s ease-out";
    for (k = 0; k < km; k++) list[k].style.transition = z;
    this.ig.appendChild(tpl.content);
    list = this.ig.lastChild.querySelectorAll("circle");
    km = list.length;
    this.ig.offsetHeight;
    z = "translate(" + xn + "px," + yn + "px)";
    for (k = 0; k < km; k++) list[k].style.transform = z;
  };
  mxG.S.prototype.removeAnimatedGoban = function(c) {
    var e = this.ig.querySelector("svg:nth-of-type(2)");
    if (e) this.ig.removeChild(e);
  };
  mxG.S.prototype.makeGoban = function() {
    var s, c, p;
    var i, j;
    var x, y, x1, y1, x2, y2, w, h, wmax, wr, z, a;
    this.vNat = [];
    this.vStr = [];
    this.w = this.dw * (this.xr - this.xl + 1) + this.gbsxl + this.gbsxr;
    this.h = this.dh * (this.yb - this.yt + 1) + this.gbsyt + this.gbsyb;
    // if pointsNumMax is not 0, reduce the width of ig or one of its ancestors
    // to be able to display small gobans or parts of goban with the same stone diameter
    // as the stone diameter of a reference goban (which has pointsNumMax on its rows)
    //     if magicParentNum is 0, ig itself is reduced
    //     if magicParentNum is 1, ig parent is reduced
    //     if magicParentNum is 2, ig grandparent is reduced etc.
    // magicParentNum is useful when other components
    // such as "navigation" or "notSeen" should have the same width as ig
    p = this.ig;
    km = this.p.magicParentNum || 0;
    for (k = 0; k < km; k++) p = p.parentNode;
    this.setMagicGobanWidth(p);
    // convenient width should be set in css
    // style set below is the minimalist style
    //   convenient if style is disabled (goban is well displayed)
    //   convenient for Edit component (need no css)
    s = "<svg";
    s += ' xmlns="http://www.w3.org/2000/svg"'; // need it for "Image" component
    s += ' id="' + this.p.n + 'GobanSvg" class="mxGobanSvg"';
    s += ' viewBox="0 0 ' + this.w + " " + this.h + '"';
    //s+=" width=\"100%\" height=\"100%\""; // safer, else bug if borders in Chrome?
    s += ' width="' + this.w + '" height="' + this.h + '"';
    s += ' stroke-linecap="square"';
    s += ' font-family="arial,sans-serif"';
    s += ' font-size="' + this.fs + '"';
    s += ' font-weight="400"';
    s += ' text-anchor="middle"';
    s += ">";
    s += "<title>" + this.p.local("Goban") + "</title>"; // accessibility
    if (this.in3dOn) {
      s += "<defs>";
      s += this.makeGradient("Black");
      s += this.makeGradient("White");
      s += "</defs>";
    }
    s += this.makeBackground("Whole");
    s += this.makeBackground("Outer");
    if (this.indicesOn) s += this.makeIndices();
    s += this.makeBackground("Inner");
    s += '<g id="' + this.p.n + 'Grid" class="mxGrid"></g>';
    s += '<g id="' + this.p.n + 'Points" class="mxPoints"></g>';
    s += '<g id="' + this.p.n + 'Focus" class="mxFocus"></g>';
    s += "</svg>";
    return s;
  };
  mxG.S.prototype.setInternalParameters = function() {
    // internal parameters
    var stretchingArray = this.stretching.split(",");
    this.in3dWidthStretch = parseInt(stretchingArray[0] + "");
    this.in3dHeightStretch = parseInt(stretchingArray[1] + "");
    this.in2dWidthStretch = parseInt(stretchingArray[2] + "");
    this.in2dHeightStretch = parseInt(stretchingArray[3] + "");
    if (this.in3dOn) {
      this.pws = this.in3dWidthStretch ? this.in3dWidthStretch : 0;
      this.phs = this.in3dHeightStretch ? this.in3dHeightStretch : 0;
    } else {
      this.pws = this.in2dWidthStretch ? this.in2dWidthStretch : 0;
      this.phs = this.in2dHeightStretch ? this.in2dHeightStretch : 0;
    }
    this.dw = this.d + this.pws;
    this.dh = this.d + this.phs;
    this.db = (this.dw + this.dh) / 2; // for indices area
    if (this.indicesOn) {
      this.gbsxl =
        (this.xl == 1 ? this.gobp + this.grim + this.gobm + this.db : 0) +
        this.grip;
      this.gbsyt =
        (this.yt == 1 ? this.gobp + this.grim + this.gobm + this.db : 0) +
        this.grip;
      this.gbsxr =
        (this.xr == this.DX ? this.gobp + this.grim + this.gobm + this.db : 0) +
        this.grip;
      this.gbsyb =
        (this.yb == this.DY ? this.gobp + this.grim + this.gobm + this.db : 0) +
        this.grip;
    } else {
      this.gbsxl = (this.xl == 1 ? this.gobm : 0) + this.grip;
      this.gbsyt = (this.yt == 1 ? this.gobm : 0) + this.grip;
      this.gbsxr = (this.xr == this.DX ? this.gobm : 0) + this.grip;
      this.gbsyb = (this.yb == this.DY ? this.gobm : 0) + this.grip;
    }
  };
  mxG.S.prototype.init = function() {
    var p = this.p;
    this.ig = p.getE("InnerGobanDiv"); // DIV where goban displays
    this.stoneShadowOn = p.stoneShadowOn;
    this.pointsNumMax = p.pointsNumMax;
    this.japaneseIndicesOn = p.japaneseIndicesOn;
    this.oldJapaneseIndicesOn = p.oldJapaneseIndicesOn;
    this.oldJapaneseNumberingOn = p.oldJapaneseNumberingOn;
    this.eraseGridUnder = p.eraseGridUnder;
    this.grip = p.gridPadding;
    this.grim = p.gridMargin;
    this.gobp = p.gobanPadding;
    this.gobm = p.gobanMargin;
    this.stretching = p.stretching;
  };
  mxG.S.prototype.getLabelLen = function(a, str) {
    var len = a.getComputedTextLength();
    len = str.length > 2 ? 0.8 * len : str.length > 1 ? (len = 0.9 * len) : len;
    len += 0.15 * this.dw;
    return Math.max(0.85 * this.dw, len);
  };
  mxG.S.prototype.getHorizontalGridLine = function(j) {
    var g = this.p.getE("Grid"),
      list;
    list = g.querySelectorAll("path");
    return list[this.xr - this.xl + 1 + j - this.yt];
  };
  mxG.S.prototype.getVerticalGridLine = function(i) {
    var g = this.p.getE("Grid"),
      list;
    list = g.querySelectorAll("path");
    return list[i - this.xl];
  };
  mxG.S.prototype.eraseVerticalGridSegment = function(i, y) {
    var e, d1, d2, a, b, k, km, x, y1, y2, f1, f2;
    e = this.getVerticalGridLine(i);
    d1 = e.getAttributeNS(null, "d");
    a = d1.match(/[^M0-9.-][0-9.-]+/g);
    km = a.length;
    b = [];
    x = this.i2x(i);
    for (k = 0; k < km; k++) {
      b[k] = parseFloat(a[k].substring(1));
      a[k] = a[k].substring(0, 1);
      if (a[k] == " ") a[k] = "M";
    }
    y1 = Math.max(b[0], y - this.dh / 2);
    y2 = Math.min(b[km - 1], y + this.dh / 2);
    d2 = "M" + x + " " + b[0];
    f1 = 0;
    f2 = 0;
    for (k = 1; k < km; k++) {
      if (!f1) {
        if (b[k] >= y1) {
          if (a[k] == "V") d2 += "V" + y1;
          f1 = 1;
        } else {
          if (a[k] == "V") d2 += "V" + b[k];
          else d2 += "M" + x + " " + b[k];
        }
      }
      if (f1 && !f2) {
        if (b[k] >= y2) {
          d2 += "M" + x + " " + y2;
          f2 = 1;
        }
      }
      if (f1 && f2 && b[k] > y2) {
        if (a[k] == "V") d2 += "V" + b[k];
        else d2 += "M" + x + " " + b[k];
      }
    }
    if (d1 != d2) e.setAttributeNS(null, "d", d2);
  };
  mxG.S.prototype.eraseVerticalGridSegments = function(i, j, x, y, w) {
    var i, i1, i2, ik, e;
    i1 = Math.max(this.xl, i - Math.floor(w / 2 / this.dw));
    i2 = Math.min(this.xr, i + Math.floor(w / 2 / this.dw));
    // if (ik==i) the job was done when making the grid
    for (ik = i1; ik <= i2; ik++) {
      if (ik != i) {
        this.eraseVerticalGridSegment(ik, y);
        if (this.star(ik, j)) {
          e = this.p.getE("Grid").querySelector(".mxStar" + ik + "_" + j);
          e.parentNode.removeChild(e);
        }
      }
    }
  };
  mxG.S.prototype.eraseLongGridSegment = function(i, j, x, y, w) {
    // is executed only when long label (i.e. almost never)
    var e, d1, d2, a, b, k, km, x1, x2, m;
    e = this.getHorizontalGridLine(j);
    d1 = e.getAttributeNS(null, "d");
    a = d1.match(/(M|H)[0-9.-]+/g);
    km = a.length;
    b = [];
    for (k = 0; k < km; k++) {
      b[k] = parseFloat(a[k].substring(1));
      a[k] = a[k].substring(0, 1);
    }
    x1 = Math.max(Math.floor((x - w / 2) * 10) / 10, b[0]);
    x2 = Math.min(Math.ceil((x + w / 2) * 10) / 10, b[km - 1]);
    d2 = "M" + b[0] + " " + y;
    f1 = 0;
    f2 = 0;
    for (k = 1; k < km; k++) {
      if (!f1) {
        if (b[k] >= x1) {
          if (a[k] == "H") d2 += "H" + x1; // else already in a "M" segement
          f1 = 1; // x1 found
        } // keep segment before x1 as is
        else {
          if (a[k] == "H") d2 += "H" + b[k];
          else d2 += "M" + b[k] + " " + y;
        }
      }
      if (f1 && !f2) {
        if (b[k] >= x2) {
          d2 += "M" + x2 + " " + y;
          f2 = 1; // x2 found
        }
        // else wait for next segment
      }
      if (f1 && f2 && b[k] > x2) {
        // keep segment after x2 as is
        if (a[k] == "H") d2 += "H" + b[k];
        else d2 += "M" + b[k] + " " + y;
      }
      // else wait for next segment
    }
    if (d1 != d2) e.setAttributeNS(null, "d", d2);
    this.eraseVerticalGridSegments(i, j, x, y, w);
  };
  mxG.S.prototype.addPointBackground = function(i, j, nat, str) {
    var a,
      b,
      p,
      cls,
      x,
      y,
      h,
      w,
      vof = 0;
    if (str && (this.isLabel(str) || this.isVariation(str))) {
      p = this.p.getE("Points");
      if ((a = p.querySelector("text.mx" + i + "_" + j))) {
        cls = "mxPointBackground mx" + i + "_" + j;
        if (this.isLabel(str)) cls += " mxLabel";
        if (this.isVariation(str)) cls += " mxVariation";
        if (this.isVariationOnFocus(str)) {
          cls += " mxOnFocus";
          if (a.classList.contains("mxOnEmpty")) vof = 1;
        }
        if (a.classList.contains("mxOnBlack")) cls += " mxOnBlack";
        else if (a.classList.contains("mxOnWhite")) cls += " mxOnWhite";
        else if (a.classList.contains("mxOnEmpty")) cls += " mxOnEmpty";
        h = 0.85 * this.dh;
        w = this.getLabelLen(a, str);
        x = parseFloat(a.getAttributeNS(null, "x"));
        y = parseFloat(a.getAttributeNS(null, "y"));
        b = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        b.setAttributeNS(null, "fill", "none");
        b.setAttributeNS(null, "stroke", vof ? "#000" : "none");
        b.setAttributeNS(null, "x", x - w / 2);
        b.setAttributeNS(null, "y", y - h / 2 - 5);
        b.setAttributeNS(null, "width", w);
        b.setAttributeNS(null, "height", h);
        b.setAttribute("class", cls);
        p.insertBefore(b, a);
        // if (w<=this.dw) the job was done when making the grid
        if (w > this.dw) this.eraseLongGridSegment(i, j, x, y - 5, w);
      }
    }
  };
  mxG.S.prototype.draw = function(vNat, vStr, pFocus) {
    var i,
      j,
      k,
      km,
      s = "",
      opacity,
      nat,
      str,
      list,
      a,
      b,
      c,
      xf,
      yf,
      o,
      z;
    this.p.getE("Grid").innerHTML = this.makeGrid(vNat, vStr);
    this.pNat = this.vNat;
    this.pStr = this.vStr;
    this.vNat = vNat;
    this.vStr = vStr;
    this.pFocus = pFocus;
    for (i = this.xl; i <= this.xr; i++)
      for (j = this.yt; j <= this.yb; j++) {
        k = this.p.xy(i, j);
        nat = this.vNat[k];
        str = this.vStr[k];
        if (nat == "B" || nat == "W") {
          o = { in3dOn: this.in3dOn, stoneShadowOn: this.stoneShadowOn };
          o.opacity = str == "_TB_" || str == "_TW_" ? 0.5 : 1;
          c = nat == "B" ? "Black" : "White";
          s += this.makeStone(c, this.i2x(i), this.j2y(j), this.d / 2, o);
        }
      }
    // has to do this after making stones
    // to be able to draw mark or label background over stone
    for (i = this.xl; i <= this.xr; i++)
      for (j = this.yt; j <= this.yb; j++) {
        k = this.p.xy(i, j);
        s += this.makeNumberOrMarkOrLabel(i, j, this.vNat[k], this.vStr[k]);
      }
    this.p.getE("Points").innerHTML = s;
    if ((xf = this.pFocus.x) && (yf = this.pFocus.y))
      this.p.getE("Focus").innerHTML = this.makeFocusMark(
        this.i2x(xf),
        this.j2y(yf)
      );
    else this.p.getE("Focus").innerHTML = "";
    for (i = this.xl; i <= this.xr; i++)
      for (j = this.yt; j <= this.yb; j++) {
        k = this.p.xy(i, j);
        this.addPointBackground(i, j, this.vNat[k], this.vStr[k]);
      }
  };
  // loop, navigation and solve buttons
  mxG.S.prototype.makeBtnRectangle = function(x) {
    return '<rect x="' + x + '" y="0" width="24" height="128"/>';
  };
  mxG.S.prototype.makeBtnTriangle = function(x, a) {
    var z = a * 52;
    return (
      '<polygon points="' + x + " 64 " + (x + z) + " 128 " + (x + z) + ' 0"/>'
    );
  };
  mxG.S.prototype.makeBtnContent = function(a, t) {
    // convenient width and height should be set in css
    var s = "<svg";
    s += ' xmlns="http://www.w3.org/2000/svg"';
    s += ' width="40" height="40" viewBox="0 0 128 128">';
    if (t) s += "<title>" + t + "</title>";
    return s + a + "</svg>";
  };
  mxG.S.prototype.makeFirstBtn = function() {
    var s = this.makeBtnRectangle(26) + this.makeBtnTriangle(50, 1);
    return this.makeBtnContent(s, "First");
  };
  mxG.S.prototype.makeTenPredBtn = function() {
    var s = this.makeBtnTriangle(4, 1) + this.makeBtnTriangle(56, 1);
    return this.makeBtnContent(s, "10 Previous");
  };
  mxG.S.prototype.makePredBtn = function() {
    var s = this.makeBtnTriangle(30, 1);
    return this.makeBtnContent(s, "Previous");
  };
  mxG.S.prototype.makeNextBtn = function() {
    var s = this.makeBtnTriangle(98, -1);
    return this.makeBtnContent(s, "Next");
  };
  mxG.S.prototype.makeTenNextBtn = function() {
    var s = this.makeBtnTriangle(72, -1) + this.makeBtnTriangle(124, -1);
    return this.makeBtnContent(s, "10 Next");
  };
  mxG.S.prototype.makeLastBtn = function() {
    var s = this.makeBtnTriangle(78, -1) + this.makeBtnRectangle(78);
    return this.makeBtnContent(s, "Last");
  };
  mxG.S.prototype.makeAutoBtn = function() {
    var s = this.makeBtnTriangle(0, 1) + this.makeBtnTriangle(128, -1);
    return this.makeBtnContent(s, "Auto");
  };
  mxG.S.prototype.makePauseBtn = function() {
    var s = this.makeBtnRectangle(24) + this.makeBtnRectangle(80);
    return this.makeBtnContent(s, "Pause");
  };
  mxG.S.prototype.makeRetryBtn = function() {
    var s;
    s = '<path d="M0 64L64 64L32 92L0 64Z"/>';
    s += '<path d="M24 64A50 50 0 1 1 49 107L57 94A34 34 0 1 0 40 64Z"/>';
    return this.makeBtnContent(s, "Retry");
  };
  mxG.S.prototype.makeUndoBtn = function() {
    var s;
    s =
      '<path d="M20,105H108C114.6,105 120,99 120,93V44C120,37 114,32 108,32H40V8L8,40 40,72V48H96C100,48 104,51 104,56V81C104,85 100,89 96,89H20 Z"/>';
    return this.makeBtnContent(s, "Undo");
  };
  mxG.S.prototype.makeHintBtn = function() {
    var s;
    s = '<rect x="54" y="10" width="20" height="64" rx="5" ry="5"/>';
    s += '<circle cx="64" cy="104" r="14"/>';
    return this.makeBtnContent(s, "Hint");
  };
  mxG.S.prototype.makePassBtn = function() {
    var s;
    s =
      '<path fill-rule="evenodd" d="M 64,10 L 118,64 L 64,118 L 10,64 Z M 64,35 L 93,64 L 64,93 L 35,64 Z"/>';
    return this.makeBtnContent(s, "Pass");
  };
  mxG.S.prototype.makeFromPath = function(p) {
    var s = "<svg";
    s += ' xmlns="http://www.w3.org/2000/svg"';
    s += ' viewBox="0 0 1024 1024">';
    return s + "<path d='" + p + "'/></svg>";
  };
  mxG.S.prototype.addSelect = function(i, j) {
    var b, x, y, w, h, cls;
    w = this.dw;
    h = this.dh;
    if (i == this.xl) {
      x = 0;
      w = this.i2x(i + 1) - this.dw / 2;
    } else if (i == this.xr) {
      x = this.i2x(i - 1) + this.dw / 2;
      w = this.w - x;
    } else {
      x = this.i2x(i) - this.dw / 2;
      w = this.dw;
    }
    if (j == this.yt) {
      y = 0;
      h = this.j2y(j + 1) - this.dh / 2;
    } else if (j == this.yb) {
      y = this.j2y(j - 1) + this.dh / 2;
      h = this.h - y;
    } else {
      y = this.j2y(j) - this.dh / 2;
      h = this.dh;
    }
    cls = "mxSelect";
    cls += " mx" + i + "_" + j;
    b = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    b.setAttributeNS(null, "fill", "rgba(127,127,127,0.5)");
    b.setAttributeNS(null, "stroke", "none");
    b.setAttributeNS(null, "x", x);
    b.setAttributeNS(null, "y", y);
    b.setAttributeNS(null, "width", w);
    b.setAttributeNS(null, "height", h);
    b.setAttribute("class", cls);
    this.ig.firstChild.appendChild(b);
  };
  mxG.S.prototype.removeSelect = function(i, j) {
    var a, b;
    a = this.ig.firstChild;
    b = a.querySelector(".mxSelect.mx" + i + "_" + j);
    if (b) a.removeChild(b);
  };
  mxG.S.prototype.makeOneStone4Bowl = function(nat, x, y, d, o) {
    // no shadow inside the bowl
    var s = "",
      o2 = {};
    // todo: why without o2, o keeps changes below outside this function?
    if (o.hasOwnProperty("opacity")) o2.opacity = o.opacity;
    if (o.hasOwnProperty("stoneShadowOn")) o2.stoneShadowOn = o.stoneShadowOn;
    if (o.hasOwnProperty("whiteStroke4Black"))
      o2.whiteStroke4Black = o.whiteStroke4Black;
    o.opacity = 1;
    o.stoneShadowOn = 0;
    o.whiteStroke4Black = 1;
    s = this.makeStone(nat == "B" ? "Black" : "White", x, y, d / 2, o);
    if (o2.hasOwnProperty("opacity")) o.opacity = o2.opacity;
    if (o2.hasOwnProperty("stoneShadowOn")) o.stoneShadowOn = o2.stoneShadowOn;
    if (o2.hasOwnProperty("whiteStroke4Black"))
      o.whiteStroke4Black = o2.whiteStroke4Black;
    return s;
  };
  mxG.S.prototype.makeBowl = function(nat, o) {
    // no svg shadow for the bowl
    var s = "",
      x,
      y,
      r,
      i,
      j,
      k,
      km,
      km2,
      dk,
      rk,
      magicNum;
    magicNum = ((this.w / this.d) * 100) / this.wr;
    dk = (this.bowlW / magicNum) * 3;
    rk = dk / 2;
    x = this.bowlW / 2;
    y = nat == "W" ? this.bowlW / 2 : this.bowlW / 2 + this.capW;
    r = (this.bowlW / 2) * 0.9;
    r2 = r - rk;
    s += '<circle class="mxBowlBackground"';
    s += ' fill="' + (nat == "B" ? "#000" : "#ccc") + '"';
    s += ' cx="' + x + '" cy="' + y + '" r="' + r + '"/>';
    km = Math.ceil((2 * r2) / dk);
    for (i = 0; i < km; i++)
      for (j = 0; j < km; j++) {
        xk = (2 * r2 * (i + (j & 1 ? 0.5 : 0))) / km - r2;
        yk = (2 * r2 * (j + 0.5)) / km - r2;
        if (xk * xk + yk * yk < r2 * r2)
          s += this.makeOneStone4Bowl(nat, x + xk, y + yk, dk, o);
      }
    km2 = km * km;
    for (k = 0; k < km2; k++) {
      xk = 2 * (r2 - rk) * Math.random() - (r2 - rk);
      yk = 2 * (r2 - rk) * Math.random() - (r2 - rk);
      if (xk * xk + yk * yk < r2 * r2)
        s += this.makeOneStone4Bowl(nat, x + xk, y + yk, dk, o);
    }
    s += '<circle class="mxBowl"';
    if (o.in3dOn)
      s += ' fill="url(#' + this.p.n + nat + 'BowlIn3dRadialGradient)"';
    else s += ' fill="url(#' + this.p.n + nat + 'BowlIn2dRadialGradient)"';
    s += ' cx="' + x + '" cy="' + y + '" r="' + r + '"/>';
    return s;
  };
  mxG.S.prototype.makeCap = function(nat, n, o) {
    // no svg shadow for the cap
    var s = "",
      x,
      y,
      r,
      c = nat == "B" ? "Black" : "White";
    x = this.bowlW / 2;
    y = nat == "W" ? this.bowlW + this.capW / 2 : this.capW / 2;
    dy = (this.capW * 5) / 42;
    r = (this.capW / 2) * 0.9;
    s += '<circle class="mxCap"';
    if (o.in3dOn)
      s += ' fill="url(#' + this.p.n + nat + 'CapIn3dRadialGradient)"';
    else s += ' fill="url(#' + this.p.n + nat + 'CapIn2dRadialGradient)"';
    s += ' cx="' + x + '" cy="' + y + '" r="' + r + '"/>';
    s += '<text id="' + this.p.n + c + "PrisonersText" + '"';
    s += ' fill="' + c + '"';
    s += ' x="' + x + '" y="' + y + '" dy="' + dy + '"';
    s += ">";
    s += n;
    s += "</text>";
    return s;
  };
  mxG.S.prototype.makeBowlAndCap = function(nat, n, o) {
    var s = "";
    this.bowlW = 5 * this.d;
    this.capW = 4 * this.d;
    s += "<svg";
    s += ' xmlns="http://www.w3.org/2000/svg"';
    s += ' viewBox="0 0 ' + this.bowlW + " " + (this.bowlW + this.capW) + '"';
    s +=
      ' width="' + this.bowlW + '" height="' + (this.bowlW + this.capW) + '"';
    s += ' font-family="arial,sans-serif"';
    s += ' font-size="' + this.capW / 3 + '"';
    s += ' text-anchor="middle"';
    s += ">";
    s += "<title>" + this.p.local("Bowl") + "</title>";
    s += "<defs>";
    // use stop-opacity instead of transparent (better support, see ios)
    s += '<radialGradient id="' + this.p.n + nat + 'BowlIn3dRadialGradient"';
    s += ' class="mx' + nat + 'BowlRadialGradient"';
    s += ' cx="50%" cy="50%" r="50%">';
    s += '<stop stop-color="#000" offset="0" stop-opacity="0"/>';
    s += '<stop stop-color="#000" offset="0.7" stop-opacity="0"/>';
    s += '<stop stop-color="#da7" offset="0.7"/>';
    s += '<stop stop-color="#da7" offset="0.8"/>';
    s += '<stop stop-color="#853" offset="0.85"/>';
    s += '<stop stop-color="#964" offset="1"/>';
    s += "</radialGradient>";
    s += '<radialGradient id="' + this.p.n + nat + 'BowlIn2dRadialGradient"';
    s += ' class="mx' + nat + 'BowlRadialGradient"';
    s += ' cx="50%" cy="50%" r="50%">';
    s += '<stop stop-color="#000" offset="0" stop-opacity="0"/>';
    s += '<stop stop-color="#000" offset="0.7" stop-opacity="0"/>';
    s += '<stop stop-color="#da7" offset="0.7"/>';
    s += '<stop stop-color="#da7" offset="0.8"/>';
    s += '<stop stop-color="#964" offset="0.8"/>';
    s += '<stop stop-color="#964" offset="1"/>';
    s += "</radialGradient>";
    s += '<radialGradient id="' + this.p.n + nat + 'CapIn3dRadialGradient"';
    s += ' class="mx' + nat + 'CapRadialGradient"';
    s += ' cx="50%" cy="50%" r="50%">';
    s += '<stop stop-color="#a74" offset="0"/>';
    s += '<stop stop-color="#8f5430" offset="0.65"/>';
    s += '<stop stop-color="#741" offset="0.7"/>';
    s += '<stop stop-color="#741" offset="0.8"/>';
    s += '<stop stop-color="#852" offset="0.85"/>';
    s += '<stop stop-color="#964" offset="1"/>';
    s += "</radialGradient>";
    s += '<radialGradient id="' + this.p.n + nat + 'CapIn2dRadialGradient"';
    s += ' class="mx' + nat + 'CapRadialGradient"';
    s += ' cx="50%" cy="50%" r="50%">';
    s += '<stop stop-color="#a74" offset="0"/>';
    s += '<stop stop-color="#a74" offset="0.7"/>';
    s += '<stop stop-color="#741" offset="0.7"/>';
    s += '<stop stop-color="#741" offset="0.8"/>';
    s += '<stop stop-color="#964" offset="0.8"/>';
    s += '<stop stop-color="#964" offset="1"/>';
    s += "</radialGradient>";
    s += "</defs>";
    s += this.makeBowl(nat, o);
    s += this.makeCap(nat, n, o);
    s += "</svg>";
    return s;
  };
}
// maxiGos v7 > mgos.js
if (!mxG.G) {
  mxG.fr("_", ""); // empty string for alias
  mxG.en("_", ""); // empty string for alias
  mxG.G = function(k, b) {
    this.k = k; // current viewer indice in mxG.D
    this.n = "d" + k; // id seed
    this.g = "mxG.D[" + k + "]"; // current viewer
    this.a = {}; // attributes
    this.b = b; // boxes containing components
    this.c = []; // components
    this.cm = 0; // number of components
    this.j = document.scripts[document.scripts.length - 1]; // current js script
  };
  mxG.G.prototype.getE = function(id) {
    return document.getElementById(this.n + id);
  };
  mxG.G.prototype.debug = function(s, a) {
    var e = this.getE("DebugDiv"),
      g;
    if (!e) {
      e = document.createElement("div");
      e.id = this.n + "DebugDiv";
      g = this.getE("GlobalBoxDiv");
      if (g) g.parentNode.insertBefore(e, g.nextSibling);
      else this.j.parentNode.insertBefore(e, this.j.nextSibling);
    }
    if (a == 1) s = e.innerHTML + " " + s;
    else if (a == 2) s = e.innerHTML + "<br>" + s;
    e.innerHTML = s;
  };
  mxG.G.prototype.local = function(s) {
    if (mxG.Z[this.lang] && mxG.Z[this.lang][s] !== undefined)
      return mxG.Z[this.lang][s];
    if (mxG.Z["en"][s] !== undefined) return mxG.Z["en"][s];
    return s;
  };
  mxG.G.prototype.alias = function(s, t) {
    if (mxG.Z[this.lang] && this[t] && mxG.Z[this.lang][this[t]] !== undefined)
      return mxG.Z[this.lang][this[t]];
    if (mxG.Z["en"][this[t]] !== undefined) return mxG.Z["en"][this[t]];
    return this.local(s);
  };
  mxG.G.prototype.build = function(x, a) {
    var f = "build" + x;
    if (mxG.Z[this.lang] && mxG.Z[this.lang][f]) return mxG.Z[this.lang][f](a);
    if (this[f]) return this[f](a);
    return a + "";
  };
  mxG.G.prototype.hasC = function(a) {
    var c;
    for (c = 0; c < this.cm; c++) if (this.c[c] == a) return 1;
    return 0;
  };
  mxG.G.prototype.kidOnFocus = function(aN) {
    return aN.Focus ? aN.Kid[aN.Focus - 1] : null;
  };
  mxG.G.prototype.enableBtn = function(b) {
    var e = this.getE(b + "Btn");
    if (e) e.disabled = false;
  };
  mxG.G.prototype.disableBtn = function(b) {
    var e = this.getE(b + "Btn");
    if (e) e.disabled = true;
  };
  mxG.G.prototype.buildBtn = function(b) {
    // use addEventListener later instead of onclick right now
    // since CSP can block inline script execution
    var s = "";
    s += '<button class="mxBtn mx' + b.n + 'Btn"';
    // add title only if b.t is not null else if b.v is null
    // don't add title if b.t is null and b.v is not null (useless)
    if (b.t) s += ' title="' + b.t + '"';
    else if (!b.v) s += ' title="' + this.local(b.n) + '"';
    s += ' autocomplete="off"';
    s += ' id="' + this.n + b.n + 'Btn"';
    s += ">";
    s += "<span>";
    s += b.v ? b.v : this.scr.makeBtnContent("");
    s += "</span>";
    s += "</button>";
    return s;
  };
  mxG.G.prototype.addBtn = function(e, b) {
    var a,
      k = this.k;
    a = document.createElement("button");
    a.id = this.n + b.n + "Btn";
    a.autocomplete = "off";
    a.title = b.t ? b.t : this.local(b.n);
    a.innerHTML =
      "<span>" + (b.v ? b.v : this.scr.makeBtnContent("")) + "</span>";
    a.setAttribute("class", "mxBtn mx" + b.n + "Btn");
    e.appendChild(a);
    a.addEventListener(
      "click",
      function() {
        mxG.D[k]["do" + b.n]();
      },
      false
    );
  };
  mxG.G.prototype.createBtnBox = function(b) {
    if (this[b.charAt(0).toLowerCase() + b.slice(1) + "BtnOn"])
      return '<div class="mx' + b + 'Div" id="' + this.n + b + 'Div"></div>';
    return "";
  };
  mxG.G.prototype.unselectBtn = function(btn) {
    var e = this.getE(btn + "Btn");
    if (e) e.classList.remove("mxSelectedBtn");
  };
  mxG.G.prototype.selectBtn = function(btn) {
    var e = this.getE(btn + "Btn");
    if (e) e.classList.add("mxSelectedBtn");
  };
  mxG.G.prototype.createGBox = function(b) {
    var e, g;
    this.gBoxP = this.getE("GlobalBoxDiv").querySelector(
      ".mx" + this.gBoxParent + "Div"
    );
    g = this.gBoxP;
    e = document.createElement("div");
    e.className = "mxGBoxDiv mx" + b + "Div";
    e.id = this.n + b + "Div";
    /* showGBox may give focus to gBox thus need tabIndex="-1" */
    e.tabIndex = "-1";
    e.style.position = "absolute";
    e.style.left = "0";
    e.style.top = "0";
    e.style.right = "0";
    e.style.bottom = "0";
    e.style.display = "none";
    g.style.position = "relative";
    g.appendChild(e);
    return e;
  };
  mxG.G.prototype.hideGBox = function(b) {
    if (b == this.gBox) {
      this.getE(b + "Div").style.display = "none";
      this.gBox = "";
      this.gBoxP.classList.remove("mxUnder");
      this.updateAll();
    }
  };
  mxG.G.prototype.showGBox = function(b) {
    var e, p;
    if (b != this.gBox) {
      if (this.currentMenu) this.toggleMenu(this.currentMenu, 0);
      p = this.gBoxP;
      if (this.inLoop) this.inLoop = 0; //otherwise form input mess
      if (this.gBox) {
        this.getE(this.gBox + "Div").style.display = "none";
        p.classList.remove("mxUnder");
      }
      e = this.getE(b + "Div");
      e.style.display = "block";
      this.gBox = b;
      p.classList.add("mxUnder");
      e.focus();
      this.updateAll();
    }
  };
  mxG.G.prototype.htmlProtect = function(s) {
    // before any output excepting in input field or textarea
    var r = s + "";
    r = r.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    if (this.mayHaveExtraTags) {
      r = r.replace(/&lt;br\s?\/?&gt;/gi, "\n");
      r = r.replace(/&lt;p&gt;/gi, "");
      r = r.replace(/&lt;\/p&gt;/gi, "\n\n");
    }
    return r;
  };
  mxG.G.prototype.getInfoS = function(p) {
    var aN = this.cN;
    if (p == "MN" || p == "PM" || p == "FG") {
      if (aN == this.rN) aN = this.kidOnFocus(aN);
    }
    if (p == "PM" || p == "FG") while (aN != this.rN && !aN.P[p]) aN = aN.Dad;
    else {
      aN = this.rN;
      while (aN && !aN.P[p]) aN = this.kidOnFocus(aN);
    }
    if (aN && aN.P[p]) return this.htmlProtect(aN.P[p][0] + "");
    if (p == "SZ") return "19";
    if (p == "PM") return "1";
    if (p == "ST" || p == "FG") return "0";
    return "";
  };
  mxG.G.prototype.setSz = function() {
    // return true if DX or DY change
    var DX = this.DX ? this.DX : 0;
    var DY = this.DY ? this.DY : 0;
    var D = this.getInfoS("SZ").split(":");
    this.DX = parseInt(D[0]);
    this.DY = D.length > 1 ? parseInt(D[1]) : this.DX;
    return DX != this.DX || DY != this.DY;
  };
  mxG.G.prototype.setVw = function() {
    var aN = this.cN,
      x,
      y,
      s,
      k,
      km,
      xl,
      yt,
      xr,
      yb;
    if (aN == this.rN) aN = this.kidOnFocus(this.rN);
    while (aN != this.rN && !aN.P.VW) aN = aN.Dad;
    xl = this.xl ? this.xl : 0;
    yt = this.yt ? this.yt : 0;
    xr = this.xr ? this.xr : 0;
    yb = this.yb ? this.yb : 0;
    if (aN.P.VW) {
      this.xl = this.DX;
      this.yt = this.DY;
      this.xr = 1;
      this.yb = 1;
      km = aN.P.VW.length;
      for (k = 0; k < km; k++) {
        s = aN.P.VW[k];
        if (s.length == 5) {
          this.xl = Math.min(this.xl, s.c2n(0));
          this.yt = Math.min(this.yt, s.c2n(1));
          this.xr = Math.max(this.xr, s.c2n(3));
          this.yb = Math.max(this.yb, s.c2n(4));
        } else if (s.length == 2) {
          x = s.c2n(0);
          y = s.c2n(1);
          this.xl = Math.min(this.xl, x);
          this.yt = Math.min(this.yt, y);
          this.xr = Math.max(this.xl, x);
          this.yb = Math.max(this.yt, y);
        } else {
          this.xl = 1;
          this.yt = 1;
          this.xr = this.DX;
          this.yb = this.DY;
          break;
        }
      }
      this.xl = Math.max(1, this.xl);
      this.yt = Math.max(1, this.yt);
      this.xr = Math.min(this.DX, this.xr);
      this.yb = Math.min(this.DY, this.yb);
    } else {
      this.xl = 1;
      this.yt = 1;
      this.xr = this.DX;
      this.yb = this.DY;
    }
    return xl != this.xl || yt != this.yt || xr != this.xr || yb != this.yb;
  };
  mxG.G.prototype.setPl = function() {
    var aN = this.rN;
    this.uC = "B";
    while (aN.Focus) {
      aN = aN.Kid[0];
      if (aN.P) {
        if (aN.P.PL) {
          this.uC = aN.P.PL;
          break;
        } else if (aN.P.B || aN.P.W) {
          if (aN.P.B) this.uC = "B";
          else if (aN.P.W) this.uC = "W";
          break;
        }
      }
    }
    this.oC = this.uC == "W" ? "B" : "W";
  };
  mxG.G.prototype.placeAX = function() {
    var v,
      z,
      k,
      km,
      s,
      x,
      y,
      x1,
      y1,
      x2,
      y2,
      AX = ["AB", "AW", "AE"];
    for (z = 0; z < 3; z++) {
      km = (v = this.cN.P[AX[z]]) ? v.length : 0;
      for (k = 0; k < km; k++) {
        s = v[k];
        if (s.length == 2) {
          x = s.c2n(0);
          y = s.c2n(1);
          this.gor.place(AX[z], x, y);
        } else if (s.length == 5) {
          x1 = s.c2n(0);
          y1 = s.c2n(1);
          x2 = s.c2n(3);
          y2 = s.c2n(4);
          for (x = x1; x <= x2; x++)
            for (y = y1; y <= y2; y++) this.gor.place(AX[z], x, y);
        }
      }
    }
  };
  mxG.G.prototype.placeBW = function(nat) {
    var s = this.cN.P[nat][0],
      x = 0,
      y = 0;
    if (s.length == 2) {
      x = s.c2n(0);
      y = s.c2n(1);
    }
    this.gor.place(nat, x, y);
  };
  mxG.G.prototype.placeNode = function() {
    if (this.kidOnFocus(this.cN)) {
      this.cN = this.kidOnFocus(this.cN);
      if (this.cN.P.B) this.placeBW("B");
      else if (this.cN.P.W) this.placeBW("W");
      else if (this.cN.P.AB || this.cN.P.AW || this.cN.P.AE) this.placeAX();
    }
  };
  mxG.G.prototype.changeFocus = function(aN) {
    var k,
      km,
      bN = aN;
    while (bN != this.rN) {
      if (this.kidOnFocus(bN.Dad) != bN) {
        km = bN.Dad.Kid.length;
        for (k = 0; k < km; k++)
          if (bN.Dad.Kid[k] == bN) {
            bN.Dad.Focus = k + 1;
            break;
          }
      }
      bN = bN.Dad;
    }
  };
  mxG.G.prototype.backNode = function(aN) {
    this.changeFocus(aN);
    this.cN = this.rN;
    if (this.setSz()) this.hasToSetGoban = 1;
    this.gor.init(this.DX, this.DY);
    while (this.cN != aN) this.placeNode();
  };
  mxG.G.prototype.updateAll = function() {
    var k, km, s;
    if (this.hasC("Variation")) this.setMode();
    this.setVw();
    this.setIndices();
    this.setNumbering();
    km = this.cm;
    for (k = 0; k < km; k++) {
      s = "update" + this.c[k];
      if (this[s]) this[s]();
    }
  };
  mxG.G.prototype.initAll = function() {
    var k, km, s;
    km = this.cm;
    for (k = 0; k < km; k++) {
      s = "init" + this.c[k];
      if (this[s]) this[s]();
    }
  };
  // start
  mxG.G.prototype.getA = function() {
    // 1. set this.t (target tag where the viewer displays)
    // 2. get parameters values from this.t attributes
    // most of the time, this.t is this.j (this script tag itself)
    // 3. store the result in this.a, overwriting its default settings
    // 4. if not already set, try to get this.sgf from this.t tag content
    // 5. if not already set, try to get this.lang from html tags
    var i, im, j, jm, n, s, a, b, t;
    // target tag is this.a.t (as when mgosLoader.js is used) or is this script itself
    this.t = this.a.t || this.j;
    t = this.t;
    im = t.attributes.length;
    for (i = 0; i < im; i++) {
      n = t.attributes.item(i).nodeName;
      if (n.match(/^data-maxigos-/)) {
        a = n.replace(/^data-maxigos-/, "").split("-");
        s = a[0];
        jm = a.length;
        for (j = 1; j < jm; j++) s += a[j].ucFirst();
        b = t.getAttribute(n);
        this.a[s] = b.match(/^[0-9]+$/) ? parseInt(b) : b;
      }
    }
    // sgf and lang parameter are special
    this.sgf = this.a.sgf || t.innerHTML;
    this.lang = this.a.l || mxG.getLang(t); // look at this.a.l for compatibility reason
    t.innerHTML = ""; // clean t content before creating sgf viewer
  };
  mxG.G.prototype.setA = function(a, z, t) {
    // a: parameter name
    // z: default value
    // t: parameter type (bool, int, float, string or list)
    // to set a bool to null, set it to something which is not 0, 1, "0" or "1"
    // never set a string to null, let it undefined and set its default value to null
    if (!(a in this.a)) return z;
    if (t == "bool")
      return this.a[a] + "" == "1" ? 1 : this.a[a] + "" == "0" ? 0 : null;
    if (t == "int") return parseInt(this.a[a] + "");
    if (t == "float") return parseFloat(this.a[a] + "");
    if (t == "string") return this.a[a] + "";
    if (t == "list") return a ? (this.a[a] + "").split(",") : [];
    return null;
  };
  mxG.G.prototype.afterGetS = function(s, hasToShowExecutionTime) {
    var a, sgf, k, km;
    a = this.rN && this.rNs ? this.rNs.indexOf(this.rN) : -1;
    sgf = this.rN && this.rN.sgf ? this.rN.sgf : "";
    this.rN = new mxG.P(s, this.sgfLoadCoreOnly, this.sgfLoadMainOnly);
    this.rN.sgf = sgf;
    if (a < 0) this.rNs = [this.rN];
    // create this.rNs and add this.rN
    else this.rNs[a] = this.rN; // replace this.rN in this.rNs
    this.mayHaveExtraTags = 0;
    this.setSz();
    this.hasToSetGoban = 1;
    if (this.hasC("Tree")) this.hasToSetTree = 1;
    this.gor = new mxG.R();
    this.gor.init(this.DX, this.DY);
    this.cN = this.rN;
    this.placeNode();
    if (this.initMethod == "last")
      while (this.kidOnFocus(this.cN)) this.placeNode();
    else if ((km = parseInt(this.initMethod + ""))) {
      for (k = 0; k < km; k++) if (this.kidOnFocus(this.cN)) this.placeNode();
    }
    this.updateAll();
    if (hasToShowExecutionTime && mxG.ExecutionTime) mxG.ExecutionTime();
  };
  mxG.G.prototype.getF = function(f, c) {
    var xhr = new XMLHttpRequest();
    xhr.gos = this;
    xhr.f = f;
    xhr.c = c;
    xhr.onreadystatechange = function() {
      var s, m, c;
      if (this.readyState == 4) {
        if (this.status != 200) s = "";
        else s = this.responseText;
        if (s && !this.c && this.overrideMimeType) {
          if ((m = s.match(/CA\[([^\]]*)\]/))) c = m[1].toUpperCase();
          else c = "ISO-8859-1";
          if (c != "UTF-8") {
            // retry with charset found in sgf
            this.gos.getF(this.f, c);
            return;
          }
        }
        this.gos.afterGetS(s, 1);
      }
    };
    // use false if c, otherwise chrome fails if many players
    // xhr.open("GET",xhr.f,c?false:true);
    xhr.open("GET", xhr.f, true);
    if (c && xhr.overrideMimeType)
      xhr.overrideMimeType("text/plain;charset=" + c);
    xhr.send(null);
  };
  mxG.G.prototype.isSgfRecord = function(s) {
    return s.indexOf("(") >= 0;
  };
  mxG.G.prototype.getS = function() {
    var s = this.sgf,
      f,
      fo,
      f1;
    this.mayHaveExtraTags = 0;
    if (this.htmlParenthesis)
      s = s.replace(/&#40;/g, "(").replace(/&#41;/g, ")");
    if (this.isSgfRecord(s) && this.allowStringAsSource) {
      // s is assumed a sgf record
      // the only case when this.mayHaveExtraTags=1
      // since cms may add some <p> or <br> in sgf record
      this.mayHaveExtraTags = 1;
      this.afterGetS(s, 1);
      return;
    }
    if (this.allowFileAsSource) {
      // s is assumed a sgf file name or a URL returning a sgf record
      f = s.replace(/^\s+([^\s])/, "$1").replace(/([^\s])\s+$/, "$1");
      if (this.sourceFilter) {
        if (f.match(new RegExp(this.sourceFilter))) {
          this.getF(f, "");
          return;
        }
      } else {
        fo = f.split("?")[0];
        if (fo.match(/\.sgf$/)) {
          this.getF(fo, "");
          return;
        }
      }
    }
    this.afterGetS("", 1);
  };
  mxG.G.prototype.setC = function(b) {
    // must be done before createBoxes(), otherwise this.hasC will not work properly
    var a, k, km;
    km = b.length;
    for (k = 0; k < km; k++) {
      a = b[k];
      if (mxG.isArray(a)) this.setC(a);
      else this.c.push(a);
    }
    this.cm = this.c.length;
  };
  mxG.G.prototype.createBoxes = function(b) {
    var a,
      f,
      k,
      km,
      s = "";
    km = b.length;
    for (k = 0; k < km; k++) {
      a = b[k];
      if (mxG.isArray(a)) s += "<div>" + this.createBoxes(a) + "</div>";
      else {
        f = "create" + a;
        if (this[f]) s += this[f]();
      }
    }
    return s;
  };
  mxG.G.prototype.addParentClasses = function(p, e) {
    var k, km, a, b, c, id, r, t;
    km = e.children ? e.children.length : 0;
    if (km) for (k = 0; k < km; k++) this.addParentClasses(p, e.children[k]);
    if (e.id) {
      t = e.tagName;
      t = t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
      r = new RegExp(this.n + "([a-zA-Z0-9_-]+)" + t);
      b = e.id.replace(r, "$1");
    } else b = "";
    if (b && this.c.indexOf(b) >= 0) {
      a = e.parentNode;
      a.classList.add("mx" + b + "ParentDiv");
      if (a == p) return;
      a = a.parentNode;
      a.classList.add("mx" + b + "GrandParentDiv");
      if (a == p) return;
      c = "GrandParentDiv";
      do {
        c = "Great" + c;
        a = a.parentNode;
        a.classList.add("mx" + b + c);
      } while (a != p);
    }
  };
  mxG.G.prototype.createAll = function() {
    var e, cls;
    this.scr = new mxG.S(this); // must be set as soon as possible
    this.setC(this.b);
    this.in3dOn = this.setA("in3dOn", 0, "bool");
    this.allowStringAsSource = this.setA("allowStringAsSource", 1, "bool");
    this.allowFileAsSource = this.setA("allowFileAsSource", 1, "bool");
    this.gBoxParent = this.setA("gBoxParent", "Goban", "string");
    this.htmlParenthesis = this.setA("htmlParenthesis", 0, "bool");
    this.initMethod = this.setA("initMethod", "first", "string");
    this.sgfLoadCoreOnly = this.setA("sgfLoadCoreOnly", 0, "bool");
    this.sgfLoadMainOnly = this.setA("sgfLoadMainOnly", 0, "bool");
    this.sgfSaveCoreOnly = this.setA("sgfSaveCoreOnly", 0, "bool");
    this.sgfSaveMainOnly = this.setA("sgfSaveMainOnly", 0, "bool");
    this.sourceFilter = this.setA("sourceFilter", "^[^?]+\\.sgf$", "string");
    cls = "mxGlobalBoxDiv";
    cls += this.config ? " mx" + this.config + "Config" : "";
    cls += this.theme ? " mx" + this.theme + "Theme" : "";
    cls += this.in3dOn ? " mxIn3d" : " mxIn2d";
    e = document.createElement("div");
    e.id = this.n + "GlobalBoxDiv";
    e.className = cls;
    e.lang = this.lang; // to be consistent between html and maxiGos
    if (!mxG.Z[this.lang]) mxG.Z[this.lang] = [];
    e.innerHTML = this.createBoxes(this.b);
    this.addParentClasses(e, e);
    if (this.t == this.j)
      // insert global box tag in DOM just after current script tag
      this.j.parentNode.insertBefore(e, this.j.nextSibling);
    // insert global box tag in DOM in target element
    else this.t.appendChild(e);
    this.ig = this.getE("InnerGobanDiv"); // init this.ig as soon as possible
  };
  mxG.G.prototype.appendStyle = function() {
    var e, id;
    if (this.style) {
      id = "maxigos" + this.theme + "Style";
      if (!document.getElementById(id)) {
        e = document.createElement("style");
        e.id = id;
        e.innerHTML = this.style;
        document.getElementsByTagName("head")[0].appendChild(e);
      }
    }
  };
  mxG.G.prototype.afterLoading = function() {
    this.appendStyle();
    this.getA();
    this.createAll();
    this.initAll();
    this.getS();
  };
  mxG.G.prototype.start = function() {
    var k = this.k;
    if (document.readyState == "complete") {
      this.afterLoading();
    } else {
      window.addEventListener(
        "load",
        function() {
          mxG.D[k].afterLoading();
        },
        false
      );
    }
  };
}
// maxiGos v7 > mgosGoban.js
if (!mxG.G.prototype.createGoban) {
  // Words below are used in mgos_src.js
  mxG.fr("Goban", "Goban");
  mxG.fr("Bowl", "Bol");
  mxG.fr("Black", "Noir");
  mxG.fr("White", "Blanc");
  mxG.fr("B", "N");
  mxG.fr("W", "B");
  mxG.G.prototype.deplonkGoban = function(a) {
    this.ig.style.visibility = "visible";
    this.doNotFocusGobanJustAfter = a;
    this.ig.focus();
  };
  mxG.G.prototype.plonk = function() {
    if (!this.silentFail) {
      let a = this.doNotFocusGobanJustAfter ? 1 : 0,
        z = this.k;
      this.ig.style.visibility = "hidden";
      setTimeout(function() {
        mxG.D[z].deplonkGoban(a);
      }, 50);
    }
  };
  mxG.G.prototype.xy = function(x, y) {
    return (x - this.xl) * (this.yb - this.yt + 1) + y - this.yt;
  };
  mxG.G.prototype.xy2s = function(x, y) {
    return x && y
      ? String.fromCharCode(x + (x > 26 ? 38 : 96), y + (y > 26 ? 38 : 96))
      : "";
  };
  mxG.G.prototype.getEmphasisColor = function(k) {
    if (k) {
      if (k & this.goodnessCode.Good)
        return this.goodColor ? this.goodColor : 0;
      if (k & this.goodnessCode.Bad) return this.badColor ? this.badColor : 0;
      if (k & this.goodnessCode.Even)
        return this.evenColor ? this.evenColor : 0;
      if (k & this.goodnessCode.Warning)
        return this.warningColor ? this.warningColor : 0;
      if (k & this.goodnessCode.Unclear)
        return this.unclearColor ? this.unclearColor : 0;
      if (k & this.goodnessCode.OffPath)
        return this.offPathColor ? this.offPathColor : 0;
      if (k & this.goodnessCode.Focus)
        return this.focusColor ? this.focusColor : 0;
    }
    return this.neutralColor ? this.neutralColor : 0;
  };
  mxG.G.prototype.getEmphasisClass = function(k) {
    if (k) {
      if (k & this.goodnessCode.Good) return "mxGood";
      if (k & this.goodnessCode.Bad) return "mxBad";
      if (k & this.goodnessCode.Even) return "mxEven";
      if (k & this.goodnessCode.Warning) return "mxEven";
      if (k & this.goodnessCode.Unclear) return "mxUnclear";
      if (k & this.goodnessCode.OffPath) return "mxOffPath";
      if (k & this.goodnessCode.Focus) return "mxFocus";
    }
    return "mxNeutral";
  };
  mxG.G.prototype.inView = function(x, y) {
    return x >= this.xl && y >= this.yt && x <= this.xr && y <= this.yb;
  };
  mxG.G.prototype.isNextMove = function(x, y) {
    var aN, s, a, b;
    if (!(this.styleMode & 3)) {
      aN = this.kidOnFocus(this.cN);
      if (aN) {
        if (aN.P.B) s = aN.P.B[0];
        else if (aN.P.W) s = aN.P.W[0];
        else s = "";
        if (s) {
          a = s.c2n(0);
          b = s.c2n(1);
          if (a == x && b == y) return aN;
        }
      }
    }
    return 0;
  };
  mxG.G.prototype.setIndices = function() {
    var indicesOn = this.indicesOn;
    if (this.configIndicesOn === null)
      this.indicesOn = parseInt(this.getInfoS("FG") + "") & 1 ? 0 : 1;
    if (this.indicesOn && this.xl == 1) this.xli = 0;
    else this.xli = this.xl;
    if (this.indicesOn && this.yt == 1) this.yti = 0;
    else this.yti = this.yt;
    if (this.indicesOn && this.xr == this.DX) this.xri = this.DX + 1;
    else this.xri = this.xr;
    if (this.indicesOn && this.yb == this.DY) this.ybi = this.DY + 1;
    else this.ybi = this.yb;
  };
  mxG.G.prototype.setNumbering = function() {
    if (this.configAsInBookOn === null)
      this.asInBookOn = parseInt(this.getInfoS("FG") + "") & 256 ? 1 : 0;
    if (this.configNumberingOn === null || this.numberingOn) {
      // doubtful test (not as in maxigos 6.x but why)
      var aN = this.cN;
      this.numberingOn = parseInt(this.getInfoS("PM") + "");
      if (this.numberingOn && aN != this.rN) {
        var ka = 0,
          kb = 0,
          kc = 0,
          de,
          bN = null,
          cN = null,
          fg;
        while (aN != this.rN) {
          if (!bN && aN.P.MN) {
            kb = ka;
            bN = aN;
          }
          if (!cN && aN.P.FG) {
            kc = ka;
            cN = aN;
          }
          if (aN.P.AB || aN.P.AW || aN.P.AE) break;
          if (aN.P.B || aN.P.W) ka++;
          aN = aN.Dad;
        }
        if (!cN) {
          cN = this.kidOnFocus(this.rN);
          kc = ka;
        }
        de = !cN.P.B && !cN.P.W ? 1 : 0;
        fg =
          ka -
          kc +
          (bN ? parseInt(bN.P.MN[0] + "") - ka + kb - (bN == cN ? de : 0) : 0);
        this.numFrom = ka - kc;
        if (!this.numFrom) {
          this.numFrom = 1;
          fg++;
        }
        if (this.numberingOn == 2) fg = fg % 100;
        this.numWith = fg;
      } else {
        this.numFrom = 1;
        this.numWith = 1;
      }
    }
  };
  mxG.G.prototype.addMarksAndLabels = function() {
    if (!this.marksAndLabelsOn) return;
    var MX = ["MA", "TR", "SQ", "CR", "LB", "TB", "TW"];
    var k, aLen, s, s2, x, y, x1, y1, x2, y2, z;
    for (z = 0; z < 7; z++) {
      if (this.cN.P[MX[z]]) aLen = this.cN.P[MX[z]].length;
      else aLen = 0;
      for (k = 0; k < aLen; k++) {
        s = this.cN.P[MX[z]][k];
        if (MX[z] == "LB") {
          if (s.length > 3) {
            x = s.c2n(0);
            y = s.c2n(1);
            if (this.inView(x, y)) {
              s2 = s
                .substr(3)
                .replace(/\(/g, "&#40;")
                .replace(/\)/g, "&#41;");
              this.vStr[this.xy(x, y)] = "|" + s2 + "|";
            }
          }
        } else if (s.length == 2) {
          x = s.c2n(0);
          y = s.c2n(1);
          if (this.inView(x, y)) this.vStr[this.xy(x, y)] = "_" + MX[z] + "_";
        } else if (s.length == 5) {
          x1 = s.c2n(0);
          y1 = s.c2n(1);
          x2 = s.c2n(3);
          y2 = s.c2n(4);
          for (x = x1; x <= x2; x++)
            for (y = y1; y <= y2; y++)
              if (this.inView(x, y))
                this.vStr[this.xy(x, y)] = "_" + MX[z] + "_";
        }
      }
    }
  };
  mxG.G.prototype.isNumbered = function(aN) {
    if (!(aN.P["B"] || aN.P["W"])) return 0;
    if (this.configNumberingOn !== null) return this.numberingOn;
    var bN = aN == this.rN ? this.kidOnFocus(aN) : aN;
    while (bN != this.rN) {
      if (bN.P["PM"]) return parseInt(bN.P["PM"][0] + "");
      bN = bN.Dad;
    }
    return 1;
  };
  mxG.G.prototype.getAsInTreeNum = function(xN) {
    // return num of the node as it was when placed
    var aN = xN,
      ka = 0,
      kb = 0,
      kc = 0,
      de,
      bN = null,
      cN = null,
      fg;
    while (aN != this.rN) {
      if (!bN && aN.P["MN"]) {
        bN = aN;
        kb = ka;
      }
      if (!cN && aN.P["FG"]) {
        cN = aN;
        kc = ka;
      }
      if (aN.P["AB"] || aN.P["AW"] || aN.P["AE"]) break;
      if (aN.P["B"] || aN.P["W"]) ka++;
      if ((aN.Dad.P["B"] && aN.P["B"]) || (aN.Dad.P["W"] && aN.P["W"])) ka++; // tenuki
      aN = aN.Dad;
    }
    if (!cN) {
      cN = this.kidOnFocus(this.rN);
      kc = ka;
    }
    de = !cN.P.B && !cN.P.W ? 1 : 0;
    fg =
      ka -
      kc +
      (bN ? parseInt(bN.P.MN[0] + "") - ka + kb - (bN == cN ? de : 0) : 0);
    if (this.isNumbered(xN) == 2) fg = fg % 100;
    return fg + kc;
  };
  mxG.G.prototype.getVisibleMove = function(
    x,
    y // if(asInBookOn and numberingOn) return the visible move as in book // 		return the move which was on (x,y) when the current first numbered move was played if any //		else return the first move played later on (x,y) if any //		else return 0 // else return the last move played at (x,y) if any
  ) {
    var k, kmin, kmax;
    if (this.asInBookOn && this.numberingOn) {
      kmin = Math.min(this.gor.setup + this.numFrom, this.gor.play);
      for (k = kmin; k > 0; k--)
        if (
          (!this.gor.getO(k) || this.gor.getO(k) >= kmin) &&
          this.gor.getX(k) == x &&
          this.gor.getY(k) == y &&
          this.gor.getNat(k) != "E"
        )
          return k;
      kmax = this.gor.getBanNum(x, y);
      if (!kmax) kmax = this.gor.play;
      for (k = kmin + 1; k <= kmax; k++)
        if (
          this.gor.getX(k) == x &&
          this.gor.getY(k) == y &&
          this.gor.getNat(k) != "E"
        )
          return k;
      return this.gor.getBanNum(x, y);
    } else return this.gor.getBanNum(x, y);
  };
  mxG.G.prototype.getVisibleNat = function(n) {
    // n is the num of the visible move in gor history
    return this.gor.getNat(n);
  };
  mxG.G.prototype.getTenuki = function(m, n) {
    var k,
      r = 0;
    for (k = m; k > n; k--)
      if (this.gor.getNat(k) == this.gor.getNat(k - 1)) r++;
    return r;
  };
  mxG.G.prototype.getCoreNum = function(m) {
    // m is the num of the move in gor history
    var s = this.gor.setup;
    if (m > s) {
      var n = s + this.numFrom,
        r;
      if (m >= n) {
        r = m - n + this.numWith + this.getTenuki(m, n);
        return r < 1 ? "" : r + "";
      }
    }
    return "";
  };
  mxG.G.prototype.getVisibleNum = function(m) {
    // m is the num of the move in gor history
    if (this.numberingOn) return this.getCoreNum(m);
    return "";
  };
  mxG.G.prototype.preTerritory = function(x, y, nat, m) {
    if (this.marksAndLabelsOn && (this.cN.P.TB || this.cN.P.TW)) {
      if (this.asInBookOn && m != "_TB_" && m != "_TW_") {
        if (nat == "B" && this.gor.getBanNat(x, y) == "W") m = "_TW_";
        else if (nat == "W" && this.gor.getBanNat(x, y) == "B") m = "_TB_";
      }
    }
    return m;
  };
  mxG.G.prototype.addNatAndNum = function(x, y, z) {
    var m = this.getVisibleMove(x, y),
      n = this.getVisibleNum(m),
      k = this.xy(x, y);
    this.vNat[k] = this.getVisibleNat(m);
    this.vStr[k] =
      this.markOnLastOn && z == k && !n
        ? this.numAsMarkOnLastOn
          ? this.getCoreNum(m)
          : "_ML_"
        : n;
    this.vStr[k] = this.preTerritory(x, y, this.vNat[k], this.vStr[k]);
  };
  mxG.G.prototype.disableGoban = function() {
    var e = this.ig;
    if (!e.hasAttribute("data-maxigos-disabled")) {
      e.setAttribute("data-maxigos-disabled", "1");
      if (this.canGobanFocus) e.setAttribute("tabindex", "-1");
    }
  };
  mxG.G.prototype.enableGoban = function() {
    var e = this.ig;
    if (e.hasAttribute("data-maxigos-disabled")) {
      e.removeAttribute("data-maxigos-disabled");
      if (this.canGobanFocus) e.setAttribute("tabindex", "0");
    }
  };
  mxG.G.prototype.isGobanDisabled = function() {
    return this.ig.hasAttribute("data-maxigos-disabled");
  };
  mxG.G.prototype.setGoban = function() {
    // has to set goban when first drawing
    // or after modifying sgf, indicesOn, DX, DY, ...
    this.scr.setInternalParameters();
    this.ig.innerHTML = this.scr.makeGoban();
    this.hasToSetGoban = 0;
  };
  mxG.G.prototype.updateGoban = function() {
    var i,
      j,
      k,
      x,
      y,
      z = -1,
      m,
      pFocus;
    if (this.scr.in3dOn != this.in3dOn) {
      this.scr.in3dOn = this.in3dOn;
      this.hasToSetGoban = 1;
    }
    if (this.scr.stoneShadowOn != this.stoneShadowOn) {
      this.scr.stoneShadowOn = this.stoneShadowOn;
      this.hasToSetGoban = 1;
    }
    if (this.scr.stretching != this.stretching) {
      this.scr.stretching = this.stretching;
      this.hasToSetGoban = 1;
    }
    if (this.scr.indicesOn != this.indicesOn) {
      this.scr.indicesOn = this.indicesOn;
      this.hasToSetGoban = 1;
    }
    if (this.scr.DX != this.DX || this.scr.DY != this.DY) {
      this.scr.DX = this.DX;
      this.scr.DY = this.DY;
      this.hasToSetGoban = 1;
    }
    if (
      this.scr.xl != this.xl ||
      this.scr.xr != this.xr ||
      this.scr.yt != this.yt ||
      this.scr.yb != this.yb
    ) {
      this.scr.xl = this.xl;
      this.scr.xr = this.xr;
      this.scr.yt = this.yt;
      this.scr.yb = this.yb;
      this.hasToSetGoban = 1;
    }
    this.vNat = [];
    this.vStr = [];
    if (this.markOnLastOn) {
      m = this.gor.play;
      if (this.gor.getAct(m) == "") {
        x = this.gor.getX(m);
        y = this.gor.getY(m);
        if (this.inView(x, y)) z = this.xy(x, y);
      }
    }
    for (i = this.xl; i <= this.xr; i++)
      for (j = this.yt; j <= this.yb; j++) this.addNatAndNum(i, j, z); // (i,j) is in view
    this.addMarksAndLabels();
    if (this.hasC("Variation")) this.addVariationMarks();
    if (this.gobanFocusVisible && this.inView(this.xFocus, this.yFocus))
      pFocus = { x: this.xFocus, y: this.yFocus };
    else pFocus = { x: 0, y: 0 };
    if (this.hasToSetGoban) {
      this.setGoban();
      q = 1;
    } else q = 0;
    this.scr.draw(this.vNat, this.vStr, pFocus);
    if (q && this.hasC("Edit") && this.selection) this.selectView();
    if (this.gBox) this.disableGoban();
    else this.enableGoban();
  };
  mxG.G.prototype.moveFocusInView = function() {
    this.xFocus = Math.min(Math.max(this.xFocus, this.xl), this.xr);
    this.yFocus = Math.min(Math.max(this.yFocus, this.yt), this.yb);
  };
  mxG.G.prototype.doFocusGoban = function(ev) {
    // warning: all browsers don't manage event order in the same way
    if (this.doNotFocusGobanJustAfter) return;
    this.moveFocusInView();
    this.gobanFocusVisible = 1;
    if (this.inView(this.xFocus, this.yFocus))
      this.scr.draw(this.vNat, this.vStr, { x: this.xFocus, y: this.yFocus });
    else this.scr.draw(this.vNat, this.vStr, { x: 0, y: 0 });
  };
  mxG.G.prototype.hideGobanFocus = function() {
    this.gobanFocusVisible = 0;
    this.scr.draw(this.vNat, this.vStr, { x: 0, y: 0 });
  };
  mxG.G.prototype.doBlur4FocusGoban = function(ev) {
    // when leaving a document, document.activeElement remains the last focused element
    // if the goban was on focus with an invisible focus mark, do not focus it just after
    var magic = !this.gobanFocusVisible && document.activeElement == this.ig;
    if (this.gobanFocusVisible) this.hideGobanFocus();
    this.doNotFocusGobanJustAfter = magic ? 1 : 0;
  };
  mxG.G.prototype.doMouseDown4FocusGoban = function(ev) {
    // after a click on the goban, hide focus mark if any,
    // and do not focus the goban just after
    if (this.gobanFocusVisible) this.hideGobanFocus();
    this.doNotFocusGobanJustAfter = 1;
  };
  mxG.G.prototype.doContextMenu4FocusGoban = function(ev) {
    if (this.gobanFocusVisible) this.hideGobanFocus();
    this.doNotFocusGobanJustAfter = 0;
  };
  mxG.G.prototype.doKeydownGoban = function(ev) {
    var r = 0;
    if (!this.gobanFocusVisible) {
      if (this.hasC("Navigation")) this.doKeydownNavigation(ev);
      else if (this.hasC("Solve")) this.doKeydownSolve(ev);
      return;
    }
    switch (mxG.getKCode(ev)) {
      case 37:
      case 72:
        this.xFocus--;
        r = 1;
        break;
      case 39:
      case 74:
        this.xFocus++;
        r = 1;
        break;
      case 38:
      case 85:
        this.yFocus--;
        r = 1;
        break;
      case 40:
      case 78:
        this.yFocus++;
        r = 1;
        break;
    }
    if (r) {
      this.moveFocusInView();
      if (this.hasC("Edit") && this.editTool == "Select") {
        if (this.inSelect == 2) this.selectGobanArea(this.xFocus, this.yFocus);
        else this.gobanFocusVisible = 1;
      }
      this.updateAll();
      ev.preventDefault();
    }
  };
  mxG.G.prototype.initGoban = function() {
    var k = this.k;
    if (this.specialStoneOn && this.in3dOn)
      this.alea8 = mxG.shuffle([0, 1, 2, 3, 4, 5, 6, 7]);
    if (this.canGobanFocus) {
      // add event listeners to InnerGobanDiv otherwise side effect when a gBox is shown
      this.ig.addEventListener(
        "keydown",
        function(ev) {
          mxG.D[k].doKeydownGoban(ev);
        },
        false
      );
      this.ig.addEventListener(
        "focus",
        function(ev) {
          mxG.D[k].doFocusGoban(ev);
        },
        false
      );
      this.ig.addEventListener(
        "blur",
        function(ev) {
          mxG.D[k].doBlur4FocusGoban(ev);
        },
        false
      );
      this.ig.addEventListener(
        "mousedown",
        function(ev) {
          mxG.D[k].doMouseDown4FocusGoban(ev);
        },
        false
      );
      this.ig.addEventListener(
        "contextmenu",
        function(ev) {
          mxG.D[k].doContextMenu4FocusGoban(ev);
        },
        false
      );
    }
    this.scr.init();
    this.hasToSetGoban = 1;
  };
  mxG.G.prototype.createGoban = function() {
    var s = "";
    this.pointsNumMax = this.setA("pointsNumMax", 0, "int");
    this.magicParentNum = this.setA("magicParentNum", 0, "int");
    this.stoneShadowOn = this.setA("stoneShadowOn", 0, "bool");
    this.stretching = this.setA("stretching", "0,0,1,1", "string");
    this.specialStoneOn = this.setA("specialStoneOn", 0, "bool");
    this.indicesOn = this.setA("indicesOn", null, "bool");
    this.asInBookOn = this.setA("asInBookOn", null, "bool");
    this.numberingOn = this.setA("numberingOn", null, "bool");
    this.marksAndLabelsOn = this.setA("marksAndLabelsOn", null, "bool");
    this.markOnLastOn = this.setA("markOnLastOn", 0, "bool");
    this.numAsMarkOnLastOn = this.setA("numAsMarkOnLastOn", 0, "bool");
    this.japaneseIndicesOn = this.setA("japaneseIndicesOn", 0, "bool");
    this.oldJapaneseIndicesOn = this.setA("oldJapaneseIndicesOn", 0, "bool");
    this.oldJapaneseNumberingOn = this.setA(
      "oldJapaneseNumberingOn",
      0,
      "bool"
    );
    this.eraseGridUnder = this.setA("eraseGridUnder", 0, "bool");
    this.gridPadding = this.setA("gridPadding", 0, "float");
    this.gridMargin = this.setA("gridMargin", 0, "float");
    this.gobanPadding = this.setA("gobanPadding", 0, "float");
    this.gobanMargin = this.setA("gobanMargin", 0, "float");
    this.territoryMark = this.setA("territoryMark", "MS", "string");
    //this.canGobanFocus=this.setA("canGobanFocus",0,"bool");
    // to improve!
    this.canGobanFocus =
      this.hasC("Solve") ||
      this.hasC("Variation") ||
      this.hasC("Guess") ||
      this.hasC("Score")
        ? 1
        : 0;
    if (this.hasC("Edit")) {
      this.configIndicesOn = null;
      this.configAsInBookOn = null;
      this.configNumberingOn = null;
    } else {
      this.configIndicesOn = this.indicesOn;
      this.configAsInBookOn = this.asInBookOn;
      this.configNumberingOn = this.numberingOn;
    }
    if (this.canGobanFocus) {
      this.xFocus = 0;
      this.yFocus = 0;
    }
    this.numFrom = 1;
    this.numWith = 1;
    this.goodnessCode = {
      Good: 1,
      Bad: 2,
      Even: 4,
      Warning: 8,
      Unclear: 16,
      OffPath: 32,
      Focus: 64
    };
    s += '<div class="mxGobanDiv" id="' + this.n + 'GobanDiv">';
    s += '<div class="mxInnerGobanDiv" id="' + this.n + 'InnerGobanDiv"';
    s += ' tabindex="' + (this.canGobanFocus ? 0 : -1) + '"';
    s += ">";
    s += "</div>";
    s += "</div>";
    return s;
  };
}
// maxiGos v7 > mgosNavigation.js
if (!mxG.G.prototype.createNavigation) {
  mxG.fr("First", "Début");
  mxG.fr("10 Previous", "10 précédents");
  mxG.fr("Previous", "Précédent");
  mxG.fr("Next", "Suivant");
  mxG.fr("10 Next", "10 suivants");
  mxG.fr("Last", "Fin");
  mxG.G.prototype.setNFocus = function(b) {
    var a, e, g;
    a = document.activeElement;
    g = this.ig;
    if (g == a) return;
    e = this.getE(b + "Btn");
    if (e && !e.disabled && a == e) return;
    this.getE("NavigationDiv").focus();
  };
  mxG.G.prototype.doFirst = function() {
    this.backNode(this.kidOnFocus(this.rN));
    this.updateAll();
    this.setNFocus("First");
  };
  mxG.G.prototype.doTenPred = function() {
    var k,
      aN = this.cN;
    for (k = 0; k < 10; k++) {
      if (aN.Dad != this.rN) aN = aN.Dad;
      else break;
      if (this.hasC("Variation") && !(this.styleMode & 2)) {
        if (this.styleMode & 1) {
          if (aN.Dad.Kid.length > 1) break;
        } else if (aN.Kid.length > 1) break;
      }
    }
    this.backNode(aN == this.rN ? this.kidOnFocus(aN) : aN);
    this.updateAll();
    this.setNFocus("TenPred");
  };
  mxG.G.prototype.doPred = function() {
    var aN = this.cN.Dad;
    this.backNode(aN == this.rN ? this.kidOnFocus(aN) : aN);
    this.updateAll();
    this.setNFocus("Pred");
  };
  mxG.G.prototype.doNext = function() {
    this.placeNode();
    this.updateAll();
    this.setNFocus("Next");
  };
  mxG.G.prototype.doTenNext = function() {
    for (var k = 0; k < 10; k++) {
      if (this.kidOnFocus(this.cN)) this.placeNode();
      else break;
      if (this.hasC("Variation") && !(this.styleMode & 2)) {
        // break if some variations are found
        if (this.styleMode & 1) {
          if (this.cN.Dad.Kid.length > 1) break;
        } else if (this.cN.Kid.length > 1) break;
      }
    }
    this.updateAll();
    this.setNFocus("TenNext");
  };
  mxG.G.prototype.doLast = function() {
    while (this.kidOnFocus(this.cN)) this.placeNode();
    this.updateAll();
    this.setNFocus("Last");
  };
  mxG.G.prototype.doTopVariation = function(s) {
    // if(s) it means shift key is pressed
    // used to change of sgf record in case of collection
    var aN, k, km;
    if (this.styleMode & 1 || s) aN = this.cN.Dad;
    else aN = this.cN;
    k = aN.Focus;
    km = aN.Kid.length;
    if (km > 1) {
      aN.Focus = k > 1 ? k - 1 : km;
      if (this.styleMode & 1 || s) this.backNode(this.kidOnFocus(aN));
      this.updateAll();
    }
  };
  mxG.G.prototype.hasPred = function() {
    return this.cN.Dad != this.rN;
  };
  mxG.G.prototype.hasNext = function() {
    return this.cN.Kid.length;
  };
  mxG.G.prototype.hasVariation = function(s) {
    var aN = this.cN;
    if (this.styleMode & 1 || s) aN = aN.Dad;
    return aN.Kid.length > 1;
  };
  mxG.G.prototype.doBottomVariation = function(s) {
    // if(s) it means shift key is pressed
    // used to change of sgf record in case of collection
    var aN, bN, k, km;
    if (this.styleMode & 1 || s) aN = this.cN.Dad;
    else aN = this.cN;
    k = aN.Focus;
    km = aN.Kid.length;
    if (km > 1) {
      aN.Focus = k < km ? k + 1 : 1;
      if (this.styleMode & 1 || s) this.backNode(this.kidOnFocus(aN));
      this.updateAll();
    }
  };
  mxG.G.prototype.doKeydownNavigation = function(ev) {
    var r = 0,
      s = ev.shiftKey ? 1 : 0;
    switch (mxG.getKCode(ev)) {
      case 36:
      case 70:
        if (this.cN.Dad != this.rN) {
          this.doFirst();
          r = 1;
        }
        break;
      case 33:
      case 71:
        if (this.cN.Dad != this.rN) {
          this.doTenPred();
          r = 1;
        }
        break;
      case 37:
      case 72:
        if (this.cN.Dad != this.rN) {
          this.doPred();
          r = 1;
        }
        break;
      case 39:
      case 74:
        if (this.hasNext()) {
          this.doNext();
          r = 1;
        }
        break;
      case 34:
      case 75:
        if (this.hasNext()) {
          this.doTenNext();
          r = 1;
        }
        break;
      case 35:
      case 76:
        if (this.hasNext()) {
          this.doLast();
          r = 1;
        }
        break;
      case 38:
      case 85:
        if (this.hasVariation(s)) {
          this.doTopVariation(s);
          r = 1;
        }
        break;
      case 40:
      case 78:
        if (this.hasVariation(s)) {
          this.doBottomVariation(s);
          r = 1;
        }
        break;
      case 187:
        if (this.hasC("Pass")) {
          this.doPass2();
          r = 5;
        }
        break;
    }
    if (r) ev.preventDefault();
  };
  mxG.G.prototype.wheelPred = function() {
    this.backNode(this.cN.Dad);
    this.updateAll();
  };
  mxG.G.prototype.wheelNext = function() {
    this.placeNode();
    this.updateAll();
  };
  mxG.G.prototype.wheelAction = function(ev, a) {
    // wheel event is like mouse event
    // means stop keyboard navigation
    if (this.gobanFocusVisible) this.hideGobanFocus();
    this["wheel" + a]();
    // don't focus navigation bar otherwise the browser may unwanted scroll
    this.wnto = new Date().getTime();
    ev.preventDefault();
    return false;
  };
  mxG.G.prototype.doWheelNavigation = function(ev) {
    var t,
      d = 500;
    if (ev.deltaY > 0) {
      if (this.hasNext()) return this.wheelAction(ev, "Next");
    } else if (ev.deltaY < 0) {
      if (this.hasPred()) return this.wheelAction(ev, "Pred");
    }
    t = new Date().getTime();
    if (this.wnto && t - this.wnto < d) {
      this.wnto = t;
      ev.preventDefault();
      return false;
    }
    return true;
  };
  mxG.G.prototype.updateNavigation = function() {
    if (this.gBox) {
      this.disableBtn("First");
      this.disableBtn("Pred");
      this.disableBtn("TenPred");
      this.disableBtn("Next");
      this.disableBtn("TenNext");
      this.disableBtn("Last");
    } else {
      if (this.cN.Kid.length) {
        this.enableBtn("Next");
        this.enableBtn("TenNext");
        this.enableBtn("Last");
      } else {
        this.disableBtn("Next");
        this.disableBtn("TenNext");
        this.disableBtn("Last");
      }
      if (this.cN.Dad == this.rN) {
        this.disableBtn("First");
        this.disableBtn("TenPred");
        this.disableBtn("Pred");
      } else {
        this.enableBtn("First");
        this.enableBtn("TenPred");
        this.enableBtn("Pred");
      }
    }
  };
  mxG.G.prototype.initNavigation = function() {
    var e,
      k = this.k,
      b,
      bk,
      bm;
    this.ig.addEventListener(
      "wheel",
      function(ev) {
        mxG.D[k].doWheelNavigation(ev);
      },
      false
    ); // don't use {passive: true} since need to call ev.preventDefault()
    e = this.getE("NavigationDiv");
    e.addEventListener(
      "keydown",
      function(ev) {
        mxG.D[k].doKeydownNavigation(ev);
      },
      false
    );
    b = this.navigations;
    bm = b.length;
    for (bk = 0; bk < bm; bk++) {
      if (b[bk] == "First")
        this.addBtn(e, {
          n: "First",
          v: this.scr.makeFirstBtn(),
          t: this.local("First")
        });
      else if (b[bk] == "TenPred")
        this.addBtn(e, {
          n: "TenPred",
          v: this.scr.makeTenPredBtn(),
          t: this.local("10 Previous")
        });
      else if (b[bk] == "Pred")
        this.addBtn(e, {
          n: "Pred",
          v: this.scr.makePredBtn(),
          t: this.local("Previous")
        });
      else if (b[bk] == "Next")
        this.addBtn(e, {
          n: "Next",
          v: this.scr.makeNextBtn(),
          t: this.local("Next")
        });
      else if (b[bk] == "TenNext")
        this.addBtn(e, {
          n: "TenNext",
          v: this.scr.makeTenNextBtn(),
          t: this.local("10 Next")
        });
      else if (b[bk] == "Last")
        this.addBtn(e, {
          n: "Last",
          v: this.scr.makeLastBtn(),
          t: this.local("Last")
        });
      else if (b[bk] == "Loop" && this.hasC("Loop")) {
        this.loopBtnOn = 1;
        this.addBtn(e, {
          n: "Auto",
          v: this.scr.makeAutoBtn(),
          t: this.local("Auto")
        });
        this.addBtn(e, {
          n: "Pause",
          v: this.scr.makePauseBtn(),
          t: this.local("Pause")
        });
      }
    }
  };
  mxG.G.prototype.createNavigation = function() {
    var a = ["First", "TenPred", "Pred", "Next", "TenNext", "Last"],
      s = "";
    this.navigations = this.setA("navigations", a, "list");
    s += '<div class="mxNavigationDiv" id="' + this.n + 'NavigationDiv"';
    // "NavigationDiv" takes the focus via this.setNFocus()
    // buttons are inserted in this.initNavigation()
    s += ' tabindex="-1"></div>';
    return s;
  };
}
// maxiGos v7 > mgosVariation.js
if (!mxG.G.prototype.createVariation) {
  mxG.fr("Variations: ", "Variations : ");
  mxG.fr("no variation", "aucune");
  mxG.G.prototype.setMode = function() {
    this.styleMode = parseInt(this.getInfoS("ST"));
    if (this.configVariationMarksOn === null)
      this.variationMarksOn = this.styleMode & 2 ? 0 : 1;
    else {
      if (this.variationMarksOn) this.styleMode &= ~2;
      else this.styleMode |= 2;
    }
    if (this.configSiblingsOn === null)
      this.siblingsOn = this.styleMode & 1 ? 1 : 0;
    else {
      if (this.siblingsOn) this.styleMode |= 1;
      else this.styleMode &= ~1;
    }
    if (this.hideSingleVariationMarkOn) this.styleMode |= 4;
  };
  mxG.G.prototype.doClickVariationInBox = function(a) {
    var aN = this.styleMode & 1 ? this.cN.Dad : this.cN;
    if (this.styleMode & 1) this.backNode(aN);
    aN.Focus = a + 1;
    this.placeNode();
    this.updateAll();
  };
  mxG.G.prototype.addVariationMarkInBox = function(a, m) {
    var i = document.createElement("input"),
      k = this.k;
    if (this.scr.isLabel(m)) m = this.scr.removeLabelDelimiters(m);
    m = m.replace(/&#40;/g, "(").replace(/&#41;/g, ")");
    i.type = "button";
    i.value = m;
    i.addEventListener(
      "click",
      function(ev) {
        mxG.D[k].doClickVariationInBox(a);
      },
      false
    );
    this.getE("VariationDiv").appendChild(i);
  };
  mxG.G.prototype.buildVariationMark = function(l) {
    if (this.variationMarkSeed) return this.variationMarkSeed[l - 1];
    return l + "";
  };
  mxG.G.prototype.addVariationMarks = function() {
    var aN,
      s,
      k,
      km,
      l = 0,
      x,
      y,
      z,
      m,
      e = this.getE("VariationDiv");
    var s1 =
      '<span class="mxVariationsSpan">' +
      this.local("Variations: ") +
      "</span>";
    var s2 =
      '<span class="mxNoVariationSpan">' +
      this.local("no variation") +
      "</span>";
    if (this.variationBoxOn) e.innerHTML = s1;
    if (this.styleMode & 1) {
      if (!this.cN || !this.cN.Dad) {
        if (this.variationBoxOn) e.innerHTML = s1 + s2;
        return;
      }
      aN = this.cN.Dad;
    } else {
      if (!this.cN || !this.kidOnFocus(this.cN)) {
        if (this.variationBoxOn) e.innerHTML = s1 + s2;
        return;
      }
      aN = this.cN;
    }
    km = aN.Kid.length;
    if (this.styleMode & 4 && km == 1) {
      if (this.variationBoxOn) e.innerHTML = s1;
      return;
    }
    for (k = 0; k < km; k++)
      if (aN.Kid[k] != this.cN) {
        s = "";
        l++;
        if (aN.Kid[k].P.B) s = aN.Kid[k].P.B[0];
        else if (aN.Kid[k].P.W) s = aN.Kid[k].P.W[0];
        if (s.length == 2) {
          x = s.c2n(0);
          y = s.c2n(1);
          z = this.xy(x, y);
          if (this.inView(x, y)) m = this.vStr[z];
          else m = this.buildVariationMark(l);
          if ((m + "").search(/^\((.*)\)$/) == -1) {
            if (!m) m = this.buildVariationMark(l);
            if (
              !(this.styleMode & 2) &&
              (!(this.styleMode & 1) || aN.Kid[k] != this.cN)
            ) {
              this.vStr[z] = "(" + m + ")";
              if (this.isNextMove(x, y))
                this.vStr[z] = "(" + this.vStr[z] + ")";
            }
          }
          if ((m + "").search(/^_.*_$/) == 0) m = this.buildVariationMark(l);
        } else m = this.buildVariationMark(l);
        if (this.variationBoxOn && aN.Kid[k] != this.cN)
          this.addVariationMarkInBox(k, m);
      }
  };
  mxG.G.prototype.getVariationNextNat = function() {
    var aN, k, km;
    if (this.hasC("Edit") && this.editNextNat) return this.editNextNat;
    // get color from PL
    aN = this.cN;
    if (aN.P.PL) return aN.P.PL[0];
    // get color of this.kidOnFocus(this.cN)
    aN = this.kidOnFocus(this.cN);
    if (aN) {
      if (aN.P.B) return "B";
      if (aN.P.W) return "W";
    }
    // get opposite color of cN
    aN = this.cN;
    if (aN.P.B) return "W";
    if (aN.P.W) return "B";
    // get opposite color if cN has AB and no AW (handicap game?) or AW and no AB,
    if (aN.P.AB && !aN.P.AW) return "W";
    else if (aN.P.AW && !aN.P.AB) return "B";
    // get color of cN children
    km = this.cN.Kid.length;
    for (k = 0; k < km; k++) {
      aN = this.cN.Kid[k];
      if (aN.P.B) return "B";
      if (aN.P.W) return "W";
    }
    // get opposite color of cN brothers
    km = this.cN.Dad.Kid.length;
    for (k = 0; k < km; k++) {
      aN = this.cN.Dad.Kid[k];
      if (aN.P.B) return "W";
      if (aN.P.W) return "B";
    }
    // unable to decide who will play
    return "B";
  };
  mxG.G.prototype.addPlay = function(aP, x, y) {
    var aN,
      aV = this.xy2s(x, y);
    aN = new mxG.N(this.cN, aP, aV);
    aN.Add = 1;
    this.cN.Focus = this.cN.Kid.length;
  };
  mxG.G.prototype.checkBW = function(aN, a, b) {
    var s = "",
      x,
      y;
    if (aN.P.B || aN.P.W) {
      if (aN.P.B) s = aN.P.B[0];
      else s = aN.P.W[0];
      if (s.length == 2) {
        x = s.c2n(0);
        y = s.c2n(1);
      } else {
        x = 0;
        y = 0;
      }
      return x == a && y == b;
    }
    return 0;
  };
  mxG.G.prototype.checkAX = function(aN, a, b) {
    var AX = ["AB", "AW", "AE"];
    var s, x, y, aP, z, k, aLen, x1, x2, y1, y2;
    s = "";
    if (aN.P.AB) aP = "AB";
    else if (aN.P.AW) aP = "AW";
    else if (aN.P.AE) aP = "AE";
    else aP = 0;
    if (aP)
      for (z = 0; z < 3; z++) {
        aP = AX[z];
        if (aN.P[aP]) {
          aLen = aN.P[aP].length;
          for (k = 0; k < aLen; k++) {
            s = aN.P[aP][k];
            if (s.length == 2) {
              x = s.c2n(0);
              y = s.c2n(1);
              if (x == a && y == b) return 1;
            } else if (s.length == 5) {
              x1 = s.c2n(0);
              y1 = s.c2n(1);
              x2 = s.c2n(3);
              y2 = s.c2n(4);
              for (x = x1; x <= x2; x++)
                for (y = y1; y <= y2; y++) if (x == a && y == b) return 1;
            }
          }
        }
      }
    return 0;
  };
  mxG.G.prototype.checkVariation = function(a, b) {
    var aN,
      bN,
      k,
      km,
      ok = 0;
    if (this.styleMode & 1 && this.cN.Dad == this.rN) {
      this.plonk();
      return;
    }
    if (a && b && this.gor.isOccupied(a, b)) {
      aN = this.cN.Dad;
      while (!ok && aN != this.rN) {
        if (this.checkBW(aN, a, b) || this.checkAX(aN, a, b)) ok = 1;
        else aN = aN.Dad;
      }
      if (ok) {
        this.backNode(aN);
        this.updateAll();
      }
      return;
    }
    aN = this.styleMode & 1 ? this.cN.Dad : this.cN;
    km = aN.Kid.length;
    for (k = 0; k < km; k++) {
      bN = aN.Kid[k];
      if (this.checkBW(bN, a, b)) {
        if (this.styleMode & 1) this.backNode(aN);
        aN.Focus = k + 1;
        this.placeNode();
        this.updateAll();
        return;
      }
    }
    // (a,b) not in the sgf
    // don't add anything if(this.styleMode&1) since it leads to a mess
    if (this.styleMode & 1) {
      this.plonk();
      return;
    }
    this.addPlay(this.getVariationNextNat(), a, b);
    this.placeNode();
    if (this.hasC("Tree")) this.hasToSetTree = 1;
    this.updateAll();
  };
  mxG.G.prototype.doClickVariation = function(ev) {
    var c;
    if (this.isGobanDisabled()) return;
    if (this.canPlaceVariation) {
      c = this.scr.getC(ev);
      if (!this.inView(c.x, c.y)) {
        this.plonk();
        return;
      }
      this.checkVariation(c.x, c.y);
    }
  };
  mxG.G.prototype.doKeydownGobanForVariation = function(ev) {
    var c;
    if (this.isGobanDisabled()) return;
    if (this.canPlaceVariation && this.gobanFocusVisible) {
      c = mxG.getKCode(ev);
      if (c == 13 || c == 32) {
        this.checkVariation(this.xFocus, this.yFocus);
        ev.preventDefault();
      } else if (c == 187) {
        this.checkVariation(0, 0);
        ev.preventDefault();
      }
    }
  };
  mxG.G.prototype.initVariation = function() {
    var k = this.k;
    this.ig.getMClick = mxG.getMClick;
    this.ig.addEventListener(
      "click",
      function(ev) {
        mxG.D[k].doClickVariation(ev);
      },
      false
    );
    if (this.canGobanFocus)
      this.ig.addEventListener(
        "keydown",
        function(ev) {
          mxG.D[k].doKeydownGobanForVariation(ev);
        },
        false
      );
  };
  mxG.G.prototype.createVariation = function() {
    var s = "";
    // if both canPlaceGuess and canPlaceVariation are 1, canPlaceGuess is ignored
    this.canPlaceVariation = this.setA("canPlaceVariation", 0, "bool");
    if (this.canPlaceGuess && this.canPlaceVariation) this.canPlaceGuess = 0;
    this.hideSingleVariationMarkOn = this.setA(
      "hideSingleVariationMarkOn",
      0,
      "bool"
    );
    this.siblingsOn = this.setA("siblingsOn", null, "bool");
    this.variationBoxOn = this.setA("variationBoxOn", 0, "bool");
    this.variationMarkSeed = this.setA("variationMarkSeed", null, "list");
    this.variationMarksOn = this.setA("variationMarksOn", null, "bool");
    if (this.hasC("Edit")) {
      this.configVariationMarksOn = null;
      this.configSiblingsOn = null;
    } else {
      this.configVariationMarksOn = this.variationMarksOn;
      this.configSiblingsOn = this.siblingsOn;
    }
    if (this.variationBoxOn)
      s += '<div class="mxVariationDiv" id="' + this.n + 'VariationDiv"></div>';
    return s;
  };
}
// maxiGos v7 > mgosGoto.js
if (!mxG.G.prototype.createGoto) {
  mxG.G.prototype.getGotoCursorWidth = function() {
    return this.getE("GotoCursor").getBoundingClientRect().width;
  };
  mxG.G.prototype.getGotoBarWidth = function() {
    return this.getE("GotoBar").getBoundingClientRect().width;
  };
  mxG.G.prototype.setGotoCursorPos = function(w) {
    this.getE("GotoCursor").setAttribute(
      "x",
      (w * 1000) / this.getGotoBarWidth()
    );
  };
  mxG.G.prototype.doKeyupGoto = function() {
    var k;
    var aN = this.cN;
    var n = parseInt(this.getE("GotoInput").value);
    if (isNaN(n)) n = 0;
    k = Math.max(0, this.getAsInTreeNum(aN));
    if (k < n)
      while (this.kidOnFocus(aN)) {
        k = Math.max(0, this.getAsInTreeNum(aN));
        if (k >= n) break;
        aN = this.kidOnFocus(aN);
      }
    else if (k > n)
      while (aN.P && (aN.P.B || aN.P.W)) {
        k = Math.max(0, this.getAsInTreeNum(aN));
        if (k <= n) break;
        aN = aN.Dad;
      }
    this.backNode(aN);
    this.updateAll();
  };
  mxG.G.prototype.doClick2Goto = function(ev) {
    var ko,
      k1 = 0,
      kn = 0,
      aN = this.rN,
      wo,
      w1,
      wn;
    w1 = this.getE("GotoBar").getMClick(ev).x;
    wn = this.getGotoBarWidth();
    wo = this.getGotoCursorWidth();
    while ((aN = this.kidOnFocus(aN))) kn++;
    if (kn < 2) ko = 0;
    else if (kn == 2) {
      if (this.cN.Dad == this.rN) {
        if (w1 < wo) ko = 0;
        else ko = 1;
      } else {
        if (w1 > wn - wo) ko = 1;
        else ko = 0;
      }
    } else if (w1 < wo) ko = 0;
    else if (w1 > wn - wo) ko = kn - 1;
    else ko = Math.floor(((w1 - wo) / (wn - 2 * wo)) * (kn - 2)) + 1;
    aN = this.kidOnFocus(this.rN);
    while (this.kidOnFocus(aN) && k1 < ko) {
      k1++;
      aN = this.kidOnFocus(aN);
    }
    this.backNode(aN);
    this.updateAll();
  };
  mxG.G.prototype.doClickGoto = function(ev) {
    if (!this.inGoto) this.doClick2Goto(ev);
  };
  mxG.G.prototype.doMouseMoveGoto = function(ev) {
    if (this.inGoto) {
      let c, wo, wn;
      c = this.getE("GotoBar").getMClick(ev);
      wo = this.getGotoCursorWidth();
      wn = this.getGotoBarWidth();
      this.setGotoCursorPos(
        Math.min(wn - wo + 1, Math.max(0, c.x - this.gotoClickPos))
      );
      this.doClick2Goto(ev);
    }
  };
  mxG.G.prototype.doMouseDownGoto = function(ev) {
    this.inGoto = 1;
    this.gotoClickPos = this.getE("GotoCursor").getMClick(ev).x;
    document.body.classList.add("mxUnselectable");
  };
  mxG.G.prototype.doMouseUpGoto = function(ev) {
    this.inGoto = 0;
    document.body.classList.remove("mxUnselectable");
  };
  mxG.G.prototype.updateGotoBox = function() {
    if (!this.gotoBoxOn) return;
    var ko = 0,
      kn = 0,
      aN,
      wo,
      wn;
    wo = this.getGotoCursorWidth();
    wn = this.getGotoBarWidth();
    aN = this.kidOnFocus(this.rN);
    while ((aN = this.kidOnFocus(aN))) {
      kn++;
      if (aN == this.cN) ko = kn;
    }
    if (!kn) kn = 1;
    if (!this.inGoto) this.setGotoCursorPos((ko / kn) * (wn - wo));
  };
  mxG.G.prototype.updateGotoInput = function() {
    if (this.gotoInputOn) {
      var e = this.getE("GotoInput"),
        ko,
        k1 = e.value;
      // better to set ko to "" when no number (for instance when numbering doesn't start from 1)
      if (!this.cN.P || !(this.cN.P.B || this.cN.P.W)) ko = "";
      else ko = this.getAsInTreeNum(this.cN);
      if (ko != k1) e.value = ko;
      if (this.gBox) e.disabled = true;
      else e.disabled = false;
    }
  };
  mxG.G.prototype.updateGoto = function() {
    this.updateGotoInput();
    this.updateGotoBox();
  };
  mxG.G.prototype.initGoto = function() {
    var k = this.k;
    if (this.gotoInputOn) {
      let i = document.createElement("input"),
        b = this.gotoInputBefore,
        e = this.getE("NavigationDiv");
      i.type = "text";
      i.maxLength = "3";
      i.id = this.n + "GotoInput";
      i.value = 0;
      i.addEventListener(
        "keyup",
        function(ev) {
          mxG.D[k].doKeyupGoto();
        },
        false
      );
      i.classList.add("mxGotoInput");
      if (b) e.insertBefore(i, this.getE(b + "Btn"));
      else e.appendChild(i);
    }
    if (this.gotoBoxOn) {
      let bar = this.getE("GotoBar"),
        cur = this.getE("GotoCursor");
      mxG.createUnselectable();
      bar.getMClick = mxG.getMClick;
      cur.getMClick = mxG.getMClick;
      bar.addEventListener(
        "click",
        function(ev) {
          mxG.D[k].doClickGoto(ev);
        },
        false
      );
      cur.addEventListener(
        "mousedown",
        function(ev) {
          mxG.D[k].doMouseDownGoto(ev);
        },
        false
      );
      document.addEventListener(
        "mousemove",
        function(ev) {
          mxG.D[k].doMouseMoveGoto(ev);
        },
        false
      );
      document.addEventListener(
        "mouseup",
        function(ev) {
          mxG.D[k].doMouseUpGoto(ev);
        },
        false
      );
      // no need of keydown event (change can be done through navigation bar)
    }
  };
  mxG.G.prototype.createGoto = function() {
    var s = "";
    this.gotoInputBefore = this.setA("gotoInputBefore", "", "string");
    this.gotoBoxOn = this.setA("gotoBoxOn", 0, "bool");
    this.gotoInputOn = this.setA("gotoInputOn", 0, "bool");
    if (this.gotoBoxOn) {
      s += '<div class="mxGotoDiv" id="' + this.n + 'GotoDiv">';
      s += '<svg class="mxGotoSvg" id="' + this.n + 'GotoSvg"';
      s += ' viewBox="0 0 1000 20"';
      s += ' width="100%" height="100%"';
      s += ' stroke-width="2"';
      s += ">";
      s += '<rect class="mxGotoBar" id="' + this.n + 'GotoBar"';
      s += ' fill="#fff"';
      s += ' stroke="#000"';
      s += ' x="0" y="0" width="1000" height="20">';
      s += "</rect>";
      s += '<rect class="mxGotoCursor" id="' + this.n + 'GotoCursor"';
      s += ' fill="#000"';
      s += ' stroke="#000"';
      s += ' x="0" y="0" width="20" height="20">';
      s += "</rect>";
      s += "</svg>";
      s += "</div>";
    }
    return s;
  };
}
// maxiGos v7 > mgosCut.js
if (!mxG.G.prototype.createCut) {
  mxG.fr("Cut", "Couper");
  mxG.fr("Cut_Short", "X");
  mxG.en("Cut_Short", "X");
  mxG.G.prototype.doSimpleCut = function() {
    var aN, SZ, ST;
    aN = this.cN.Dad;
    if (aN == this.rN && aN.Kid.length == 1) {
      SZ = this.getInfoS("SZ");
      ST = this.getInfoS("ST");
    }
    aN.Kid.splice(aN.Focus - 1, 1);
    aN.Focus = aN.Kid.length ? 1 : 0;
    if (aN == this.rN) {
      if (aN.Focus) aN = aN.Kid[0];
      else {
        aN = new mxG.N(aN, "FF", 4);
        aN.P.GM = ["1"];
        aN.P.CA = ["UTF-8"];
        aN.P.SZ = [SZ];
        aN.P.ST = [ST];
      }
    }
    this.backNode(aN);
    if (this.hasC("Tree")) this.hasToSetTree = 1;
    this.updateAll();
  };
  mxG.G.prototype.updateCut = function() {
    if (this.getE("SimpleCutBtn")) {
      if (this.gBox) this.disableBtn("SimpleCut");
      else this.enableBtn("SimpleCut");
    }
  };
  mxG.G.prototype.initCut = function() {
    if (this.cutBtnOn)
      this.addBtn(this.getE("CutDiv"), {
        n: "SimpleCut",
        v: this.alias("Cut", "cutAlias") //剪切
      });
  };
  mxG.G.prototype.createCut = function() {
    this.cutBtnOn = this.setA("cutBtnOn", 0, "bool");
    this.cutAlias = this.setA("cutAlias", null, "string");
    return this.createBtnBox("Cut");
  };
}
// maxiGos v7 > mgosOption.js
if (!mxG.G.prototype.createOption) {
  mxG.fr("Options", "Options");
  mxG.fr("Options_Short", "O");
  mxG.fr("Cancel", "Annuler");
  mxG.fr("OK", "OK");
  mxG.fr("Mark on last", "Affichage d'une marque sur le dernier coup");
  mxG.fr("Indices", "Affichage des coordonnées");
  mxG.fr("As in book", "Comme dans les livres");
  mxG.fr("Numbering", "Numérotation");
  mxG.fr("Marks and labels", "Marques et étiquettes");
  mxG.fr("Variation marks", "Indication des variations");
  mxG.fr(
    "Show variations of current move instead of next move",
    "Affichage des alternatives au coup courant au lieu des variations du coup suivant"
  );
  mxG.fr("In 3d", "Affichage en 3d");
  mxG.fr("When clicking on the goban", "Un click sur le goban :");
  mxG.fr("place a variation", "place une variation");
  mxG.fr("try to guess the next move", "essaie de deviner le coup suivant");
  mxG.fr("from", "à partir de");
  mxG.fr("with", "avec");
  mxG.fr("Loop time:", "Temps pour l'affichage en boucle :");
  mxG.fr("Animated stone", "Pierres animées");
  mxG.fr("Animated stone time:", "Temps pour l'animation des pierres :");
  mxG.fr("score", "score");
  mxG.en("Options_Short", "O");
  mxG.G.prototype.getValidNum = function(v) {
    var n = parseInt(v);
    if (isNaN(n)) return 1;
    return n;
  };
  mxG.G.prototype.doChangeMarkOnLast = function() {
    var e = this.getE("MarkOnLastOnCheckbox");
    this.markOnLastOn = e.checked ? 1 : 0;
    this.updateAll();
  };
  mxG.G.prototype.doChangeNumbering = function() {
    var e = this.getE("NumberingOnCheckbox"),
      nf,
      nw;
    nf = this.getE("NumFromTextInput");
    nw = this.getE("NumWithTextInput");
    if (nf) nf.disabled = !e.checked;
    if (nw) nw.disabled = !e.checked;
    if (this.optionBoxOn) {
      this.numberingOn = e.checked ? 1 : 0;
      this.configNumberingOn = this.numberingOn;
      if (this.hasC("Tree")) this.hasToSetTree = 1;
      this.updateAll();
    }
  };
  mxG.G.prototype.doKeyupNumFrom = function() {
    var e = this.getE("NumFromTextInput");
    this.numFrom = this.getValidNum(e.value);
    if (this.hasC("Tree")) this.hasToSetTree = 1;
    this.updateAll();
  };
  mxG.G.prototype.doKeyupNumWith = function() {
    var e = this.getE("NumWithTextInput");
    this.numWith = this.getValidNum(e.value);
    if (this.hasC("Tree")) this.hasToSetTree = 1;
    this.updateAll();
  };
  mxG.G.prototype.doChangeMarksAndLabels = function() {
    var e = this.getE("MarksAndLabelsOnCheckbox");
    this.marksAndLabelsOn = e.checked ? 1 : 0;
    this.updateAll();
  };
  mxG.G.prototype.doChangeAsInBook = function() {
    var e = this.getE("AsInBookOnCheckbox");
    this.asInBookOn = e.checked ? 1 : 0;
    this.configAsInBookOn = this.asInBookOn;
    this.updateAll();
  };
  mxG.G.prototype.doChangeIndices = function() {
    var e = this.getE("IndicesOnCheckbox");
    this.indicesOn = e.checked ? 1 : 0;
    this.configIndicesOn = this.indicesOn;
    this.updateAll();
  };
  mxG.G.prototype.doChangeVariationMarks = function() {
    var e = this.getE("VariationMarksOnCheckbox");
    this.variationMarksOn = e.checked ? 1 : 0;
    this.configVariationMarksOn = this.variationMarksOn;
    this.styleMode = this.variationMarksOn
      ? this.styleMode & ~2
      : this.styleMode | 2;
    this.updateAll();
  };
  mxG.G.prototype.doChangeSiblings = function() {
    var e = this.getE("SiblingsOnCheckbox");
    this.siblingsOn = e.checked ? 1 : 0;
    this.configSiblingsOn = this.siblingsOn;
    this.styleMode = this.siblingsOn ? this.styleMode | 1 : this.styleMode & ~1;
    this.updateAll();
  };
  mxG.G.prototype.setIn3dClass = function() {
    var e = this.getE("GlobalBoxDiv");
    e.className = e.className.replace(
      this.in3dOn ? "mxIn2d" : "mxIn3d",
      this.in3dOn ? "mxIn3d" : "mxIn2d"
    );
  };
  mxG.G.prototype.doChangeIn3d = function() {
    var e = this.getE("In3dOnCheckbox");
    this.in3dOn = e.checked ? 1 : 0;
    this.setIn3dClass();
    this.updateAll();
  };
  mxG.G.prototype.doKeyupLoopTime = function() {
    var e = this.getE("LoopTimeTextInput");
    this.loopTime = this.getValidNum(e.value);
    this.updateAll();
  };
  mxG.G.prototype.doChangeAnimatedStone = function() {
    var e = this.getE("AnimatedStoneOnCheckbox");
    this.animatedStoneOn = e.checked ? 1 : 0;
    this.updateAll();
  };
  mxG.G.prototype.doKeyupAnimatedStoneTime = function() {
    var e = this.getE("AnimatedStoneTextInput");
    this.animatedStoneTime = this.getValidNum(e.value);
    this.updateAll();
  };
  mxG.G.prototype.doChangeCan = function() {
    var e;
    e = this.getE("CanVariationRadio");
    this.canPlaceVariation = e.checked ? 1 : 0;
    e = this.getE("CanGuessRadio");
    this.canPlaceGuess = e.checked ? 1 : 0;
    e = this.getE("CanScoreRadio");
    this.canPlaceScore = e.checked ? 1 : 0;
    this.updateAll();
  };
  mxG.G.prototype.doOptionOK = function() {
    var e;
    if ((e = this.getE("MarkOnLastOnCheckbox")))
      this.markOnLastOn = e.checked ? 1 : 0;
    if ((e = this.getE("NumberingOnCheckbox"))) {
      this.numberingOn = e.checked ? 1 : 0;
      this.configNumberingOn = this.numberingOn;
      if (this.hasC("Tree")) this.hasToSetTree = 1;
    }
    if ((e = this.getE("NumFromTextInput"))) {
      this.numFrom = this.getValidNum(e.value);
      if (this.hasC("Tree")) this.hasToSetTree = 1;
    }
    if ((e = this.getE("NumWithTextInput"))) {
      this.numWith = this.getValidNum(e.value);
      if (this.hasC("Tree")) this.hasToSetTree = 1;
    }
    if ((e = this.getE("MarksAndLabelsOnCheckbox")))
      this.marksAndLabelsOn = e.checked ? 1 : 0;
    if ((e = this.getE("AsInBookOnCheckbox"))) {
      this.asInBookOn = e.checked ? 1 : 0;
      this.configAsInBookOn = this.asInBookOn;
    }
    if ((e = this.getE("IndicesOnCheckbox"))) {
      this.indicesOn = e.checked ? 1 : 0;
      this.configIndicesOn = this.indicesOn;
    }
    if ((e = this.getE("VariationMarksOnCheckbox"))) {
      this.variationMarksOn = e.checked ? 1 : 0;
      this.configVariationMarksOn = this.variationMarksOn;
      this.styleMode = this.variationMarksOn
        ? this.styleMode & ~2
        : this.styleMode | 2;
    }
    if ((e = this.getE("SiblingsOnCheckbox"))) {
      this.siblingsOn = e.checked ? 1 : 0;
      this.configSiblingsOn = this.siblingsOn;
      this.styleMode = this.siblingsOn
        ? this.styleMode | 1
        : this.styleMode & ~1;
    }
    if ((e = this.getE("In3dOnCheckbox"))) {
      this.in3dOn = e.checked ? 1 : 0;
      this.setIn3dClass();
      if (this.hasC("Tree")) this.hasToSetTree = 1;
    }
    if ((e = this.getE("CanVariationRadio")))
      this.canPlaceVariation = e.checked ? 1 : 0;
    if ((e = this.getE("CanGuessRadio")))
      this.canPlaceGuess = e.checked ? 1 : 0;
    if ((e = this.getE("CanScoreRadio")))
      this.canPlaceScore = e.checked ? 1 : 0;
    if ((e = this.getE("LoopTimeTextInput")))
      this.loopTime = this.getValidNum(e.value);
    if ((e = this.getE("AnimatedStoneOnCheckbox")))
      this.animatedStoneOn = e.checked ? 1 : 0;
    if ((e = this.getE("AnimatedStoneTimeTextInput")))
      this.animatedStoneTime = this.getValidNum(e.value);
    if ((e = this.getE("CanScoreCheckbox")))
      if (this.canPlaceScore != (e.checked ? 1 : 0)) {
        this.toggleCanPlaceScore();
        if (this.canPlaceScore) this.computeScore();
      }
    this.hideGBox("ShowOption");
  };
  mxG.G.prototype.buildOption = function() {
    var s = "",
      c;
    s += '<div class="mxP">';
    if (!this.hideMarkOnLastOn) {
      s += '<div><label><input type="checkbox"';
      if (this.optionBoxOn)
        s += ' onchange="' + this.g + '.doChangeMarkOnLast()"';
      s += ' id="' + this.n + 'MarkOnLastOnCheckbox">';
      s += this.local("Mark on last") + "</label></div>";
    }
    if (!this.hideNumberingOn) {
      s += "<div>";
      s += "<label>";
      s += '<input type="checkbox"';
      s += ' onchange="' + this.g + '.doChangeNumbering()"';
      s += ' id="' + this.n + 'NumberingOnCheckbox">';
      s += this.local("Numbering");
      s +=
        ' <span class="mxNumFromTextSpan">' +
        (mxG.Z[this.lang]["•"]
          ? ""
          : '<label for="' +
            this.n +
            'NumFromTextInput">' +
            this.local("from")) +
        "</label>";
      s +=
        ' <input class="mxNumFromTextInput" type="text" id="' +
        this.n +
        'NumFromTextInput" size="3" maxlength="3" ';
      s +=
        (this.optionBoxOn
          ? 'onkeyup="' + this.g + '.doKeyupNumFrom()">'
          : ">") + "</span>";
      s +=
        ' <span class="mxNumWithTextSpan">' +
        (mxG.Z[this.lang]["•"]
          ? '<label for="' + this.n + 'NumFromTextInput">' + this.local("from")
          : '<label for="' +
            this.n +
            'NumWithTextInput">' +
            this.local("with")) +
        "</label>";
      s +=
        ' <input class="mxNumWithTextInput" type="text" id="' +
        this.n +
        'NumWithTextInput" size="3" maxlength="3" ';
      s +=
        (this.optionBoxOn
          ? 'onkeyup="' + this.g + '.doKeyupNumWith()">'
          : ">") +
        (mxG.Z[this.lang]["•"]
          ? '<label for="' + this.n + 'NumWithTextInput">' + this.local("with")
          : "") +
        "</span>";
      s += "</label>";
      s += "</div>";
    }
    if (!this.hideMarksAndLabelsOn) {
      s += "<div>";
      s += '<label><input type="checkbox"';
      if (this.optionBoxOn)
        s += ' onchange="' + this.g + '.doChangeMarksAndLabels()"';
      s += ' id="' + this.n + 'MarksAndLabelsOnCheckbox">';
      s += this.local("Marks and labels") + "</label>";
      s += "</div>";
    }
    if (!this.hideAsInBookOn) {
      s += "<div>";
      s += '<label><input type="checkbox"';
      if (this.optionBoxOn)
        s += ' onchange="' + this.g + '.doChangeAsInBook()"';
      s += ' id="' + this.n + 'AsInBookOnCheckbox">';
      s += this.local("As in book") + "</label>";
      s += "</div>";
    }
    if (!this.hideIndicesOn) {
      s += "<div>";
      s += '<label><input type="checkbox"';
      if (this.optionBoxOn) s += ' onchange="' + this.g + '.doChangeIndices()"';
      s += ' id="' + this.n + 'IndicesOnCheckbox">';
      s += this.local("Indices") + "</label>";
      s += "</div>";
    }
    if (this.hasC("Variation") && !this.hideVariationMarksOn) {
      s += "<div>";
      s += '<label><input type="checkbox"';
      if (this.optionBoxOn)
        s += ' onchange="' + this.g + '.doChangeVariationMarks()"';
      s += ' id="' + this.n + 'VariationMarksOnCheckbox">';
      s += this.local("Variation marks") + "</label>";
      s += "</div>";
    }
    if (this.hasC("Variation") && !this.hideSiblingsOn) {
      s += "<div>";
      s += '<label><input type="checkbox"';
      if (this.optionBoxOn)
        s += ' onchange="' + this.g + '.doChangeSiblings()"';
      s += ' id="' + this.n + 'SiblingsOnCheckbox">';
      s +=
        this.local("Show variations of current move instead of next move") +
        "</label>";
      s += "</div>";
    }
    if (!this.hideIn3dOn) {
      s += "<div>";
      s += '<label><input type="checkbox"';
      if (this.optionBoxOn) s += ' onchange="' + this.g + '.doChangeIn3d()"';
      s += ' id="' + this.n + 'In3dOnCheckbox">';
      s += this.local("In 3d") + "</label>";
      s += "</div>";
    }
    s += "</div>";
    c = 0;
    if (this.hasC("Variation") && !this.hideCanVariation) c++;
    if (this.hasC("Guess") && !this.hideCanGuess) c++;
    if (this.hasC("Score") && !this.hideCanScore) c++;
    if (c > 1) {
      s += '<div class="mxP">';
      s += "<div>" + this.local("When clicking on the goban") + "</div>";
      if (this.hasC("Variation") && !this.hideCanVariation) {
        s += "<div>";
        s += "<label>";
        s +=
          '<input name="' + this.n + 'ChangeCanRadio" value="1" type="radio"';
        if (this.optionBoxOn) s += ' onchange="' + this.g + '.doChangeCan()"';
        s += ' id="' + this.n + 'CanVariationRadio">';
        s += this.local("place a variation") + "</label>";
        s += "</div>";
      }
      if (this.hasC("Guess") && !this.hideCanGuess) {
        s += "<div>";
        s += "<label>";
        s +=
          '<input name="' + this.n + 'ChangeCanRadio" value="2" type="radio"';
        if (this.optionBoxOn) s += ' onchange="' + this.g + '.doChangeCan()"';
        s += ' id="' + this.n + 'CanGuessRadio">';
        s += this.local("try to guess the next move") + "</label>";
        s += "</div>";
      }
      if (this.hasC("Score") && !this.hideCanScore) {
        s += "<div>";
        s += "<label>";
        s +=
          '<input name="' + this.n + 'ChangeCanRadio" value="3" type="radio"';
        if (this.optionBoxOn) s += ' onchange="' + this.g + '.doChangeCan()"';
        s += ' id="' + this.n + 'CanScoreRadio">';
        s += this.local("score") + "</label>";
        s += "</div>";
      }
      s += "</div>";
    }
    s += '<div class="mxP">';
    if (this.hasC("Loop") && !this.hideLoopTime) {
      s += "<div>";
      s += "<label>" + this.local("Loop time:");
      s += ' <input type="text" size="9" maxlength="9"';
      if (this.optionBoxOn) s += ' onkeyup="' + this.g + '.doKeyupLoopTime()"';
      s += ' id="' + this.n + 'LoopTimeTextInput" class="mxLoopTimeTextInput"';
      s += "</label>";
      s += "</div>";
    }
    if (this.hasC("AnimatedStone") && !this.hideAnimatedStoneOn) {
      s += "<div>";
      s += '<label><input type="checkbox"';
      if (this.optionBoxOn)
        s += ' onchange="' + this.g + '.doChangeAnimatedStone()"';
      s += ' id="' + this.n + 'AnimatedStoneOnCheckbox">';
      s += this.local("Animated stone") + "</label>";
      s += "</div>";
    }
    if (this.hasC("AnimatedStone") && !this.hideAnimatedStoneTime) {
      s += "<div>";
      s += "<label>" + this.local("Animated stone time:");
      s +=
        ' <input class="mxAnimatedStoneTimeTextInput" type="text" size="9" maxlength="9" ';
      if (this.optionBoxOn)
        s += ' onkeyup="' + this.g + '.doKeyupAnimatedStoneTime()"';
      s +=
        ' id="' +
        this.n +
        'AnimatedStoneTimeTextInput" class="mxAnimatedStoneTimeTextInput">';
      s += "</label>";
      s += "</div>";
    }
    s += "</div>";
    return s;
  };
  mxG.G.prototype.setInputOption = function() {
    var e;
    if ((e = this.getE("MarkOnLastOnCheckbox")))
      e.checked = this.markOnLastOn == 1;
    if ((e = this.getE("NumberingOnCheckbox")))
      e.checked = this.numberingOn >= 1;
    if ((e = this.getE("NumFromTextInput"))) {
      e.value = this.numFrom;
      e.disabled = !this.numberingOn;
    }
    if ((e = this.getE("NumWithTextInput"))) {
      e.value = this.numWith;
      e.disabled = !this.numberingOn;
    }
    if ((e = this.getE("MarksAndLabelsOnCheckbox")))
      e.checked = this.marksAndLabelsOn == 1;
    if ((e = this.getE("AsInBookOnCheckbox"))) e.checked = this.asInBookOn == 1;
    if ((e = this.getE("IndicesOnCheckbox"))) e.checked = this.indicesOn == 1;
    if ((e = this.getE("VariationMarksOnCheckbox")))
      e.checked = this.variationMarksOn == 1;
    if ((e = this.getE("SiblingsOnCheckbox"))) e.checked = this.siblingsOn == 1;
    if ((e = this.getE("In3dOnCheckbox"))) e.checked = this.in3dOn == 1;
    // set only one of radio below since others are automatically set to false
    if ((e = this.getE("CanVariationRadio")) && this.canPlaceVariation == 1)
      e.checked = true;
    if ((e = this.getE("CanGuessRadio")) && this.canPlaceGuess == 1)
      e.checked = true;
    if ((e = this.getE("CanScoreRadio")) && this.canPlaceScore == 1)
      e.checked = true;
    if ((e = this.getE("LoopTimeTextInput"))) e.value = this.loopTime;
    if ((e = this.getE("AnimatedStoneOnCheckbox")))
      e.checked = this.animatedStoneOn == 1;
    if ((e = this.getE("AnimatedStoneTimeTextInput")))
      e.value = this.animatedStoneTime
        ? this.animatedStoneTime
        : this.loopTime
        ? this.loopTime
        : 1000;
    if ((e = this.getE("CanScoreCheckbox")))
      e.checked = this.canPlaceScore == 1;
  };
  mxG.G.prototype.doOption = function() {
    var s;
    if (this.gBox == "ShowOption") {
      this.hideGBox("ShowOption");
      return;
    }
    if (!this.getE("ShowOptionDiv")) {
      s = '<div class="mxShowContentDiv" tabindex="0">';
      s += "<h1>" + this.local("Options") + "</h1>";
      s += this.buildOption();
      s += "</div>";
      s += '<div class="mxOKDiv">';
      s +=
        '<button type="button" onclick="' +
        this.g +
        '.doOptionOK()"><span>' +
        this.local("OK") +
        "</span></button>";
      s +=
        '<button type="button" onclick="' +
        this.g +
        ".hideGBox('ShowOption')\"><span>" +
        this.local("Cancel") +
        "</span></button>";
      s += "</div>";
      this.createGBox("ShowOption").innerHTML = s;
    }
    this.setInputOption();
    this.showGBox("ShowOption");
  };
  mxG.G.prototype.updateOption = function() {
    if (this.optionBoxOn) this.setInputOption();
    if (this.getE("OptionBtn")) {
      if (this.gBox == "ShowOption") this.selectBtn("Option");
      else this.unselectBtn("Option");
    }
  };
  // mxG.G.prototype.initOption = function() {
  //   if (this.optionBtnOn)
  //     this.addBtn(this.getE("OptionDiv"), {
  //       n: "Option",
  //       v: this.alias("Options", "optionAlias")
  //     });
  // }; //设置
  mxG.G.prototype.createOption = function() {
    var s = "";
    this.optionBoxOn = this.setA("optionBoxOn", 0, "bool");
    this.optionBtnOn = this.setA("optionBtnOn", 0, "bool");
    this.optionAlias = this.setA("optionAlias", null, "string");
    this.hideCanGuess = this.setA("hideCanGuess", 0, "bool");
    this.hideCanScore = this.setA("hideCanScore", 0, "bool");
    this.hideCanVariation = this.setA("hideCanVariation", 0, "bool");
    this.hideMarkOnLastOn = this.setA("hideMarkOnLastOn", 0, "bool");
    this.hideNumberingOn = this.setA("hideNumberingOn", 0, "bool");
    this.hideMarksAndLabelsOn = this.setA("hideMarksAndLabelsOn", 0, "bool");
    this.hideAsInBookOn = this.setA("hideAsInBookOn", 0, "bool");
    this.hideIndicesOn = this.setA("hideIndicesOn", 0, "bool");
    this.hideVariationMarksOn = this.setA("hideVariationMarksOn", 0, "bool");
    this.hideSiblingsOn = this.setA("hideSiblingsOn", 0, "bool");
    this.hideIn3dOn = this.setA("hideIn3dOn", 0, "bool");
    this.hideLoopTime = this.setA("hideLoopTime", 0, "bool");
    this.hideAnimatedStoneOn = this.setA("hideAnimatedStoneOn", 0, "bool");
    this.hideAnimatedStoneTime = this.setA("hideAnimatedStoneTime", 0, "bool");
    if (this.optionBoxOn || this.optionBtnOn) {
      s += '<div class="mxOptionDiv" id="' + this.n + 'OptionDiv">';
      if (!this.optionBtnOn) s += this.buildOption();
      s += "</div>";
    }
    return s;
  };
}
// maxiGos v7 > mgosPass.js
if (!mxG.G.prototype.createPass) {
  mxG.fr("Pass", "Passe");
  mxG.fr("Pass_Short", "P");
  mxG.en("Pass_Short", "P");
  mxG.G.prototype.doPass2 = function() {
    this.doNotFocusGobanJustAfter = 1;
    if (this.hasC("Edit")) this.checkEditPlay(0, 0);
    else if (this.hasC("Solve") && this.canPlaceSolve) this.checkSolve(0, 0);
    else if (this.hasC("Variation") && this.canPlaceVariation)
      this.checkVariation(0, 0);
    else if (this.hasC("Guess")) this.checkGuess(0, 0);
  };
  mxG.G.prototype.doPass = function() {
    this.doPass2();
  };
  mxG.G.prototype.isPass = function(aN) {
    var s, x, y;
    if (aN.P["B"] || aN.P["W"]) {
      s = aN.P["B"] ? aN.P["B"][0] : aN.P["W"][0];
      if (s.length == 2) {
        x = s.c2n(0);
        y = s.c2n(1);
        if (x < 1 || y < 1 || x > this.dimX || y > this.dimY) {
          x = 0;
          y = 0;
        }
      } else {
        x = 0;
        y = 0;
      }
      return !(x || y);
    }
    return 0;
  };
  mxG.G.prototype.updatePass = function() {
    var aN = 0,
      k,
      km,
      status,
      look = 0,
      s,
      e = this.getE("PassBtn");
    if (!e) return;
    status = this.isPass(this.cN) ? 1 : 0;
    if (!(this.styleMode & 2)) {
      if (this.styleMode & 1) aN = this.cN.Dad;
      else aN = this.cN;
    }
    if (!this.hasC("Solve") || !this.canPlaceSolve) {
      if (aN) {
        km = aN.Kid.length;
        if (km) {
          if (this.styleMode & 1) {
            if (km > 1) look = 1;
          } else look = 1;
        }
      }
      if (look)
        for (k = 0; k < km; k++)
          if (this.isPass(aN.Kid[k])) status = status | 2;
    }
    aN = this.kidOnFocus(this.cN);
    if (aN && this.isPass(aN)) status = status | 4;
    s = "mxBtn mxPassBtn";
    if (status & 1) s += " mxJustPlayedPassBtn";
    if (status & 2) s += " mxOnVariationPassBtn";
    if (status & 4) s += " mxOnFocusPassBtn";
    e.className = s;
    if (this.gBox) this.disableBtn("Pass");
    else if (this.canPassOnlyIfPassInSgf) {
      if (status & 2) this.enableBtn("Pass");
      else this.disableBtn("Pass");
    } else this.enableBtn("Pass");
  };
  // mxG.G.prototype.initPass = function() {
  //   if (this.passBtnOn)
  //     this.addBtn(this.getE("PassDiv"), {
  //       n: "Pass",
  //       v: this.alias("Pass", "passAlias") //pass
  //     });
  // };
  mxG.G.prototype.createPass = function() {
    this.passBtnOn = this.setA("passBtnOn", 0, "bool");
    this.passAlias = this.setA("passAlias", null, "string");
    this.canPassOnlyIfPassInSgf = this.setA(
      "canPassOnlyIfPassInSgf",
      0,
      "bool"
    );
    return this.createBtnBox("Pass");
  };
}
// maxiGos v7 > mgosSgf.js
if (!mxG.G.prototype.createSgf) {
  mxG.fr(" Close ", "Fermer");
  mxG.fr("SGF", "SGF");
  mxG.fr("SGF_Short", "S");
  mxG.fr("SGF_Long", "Télécharger le SGF");
  mxG.en("SGF_Short", "S");
  mxG.en("SGF_Long", "Download SGF");
  mxG.nl2br = function(s) {
    return (s + "").replace(/\r\n|\n\r|\r|\n/g, "<br>");
  };
  mxG.sgfEsc = function(s) {
    return (s + "").replace(/([^\\\]]?)(\\|])/g, "$1" + "\\" + "$2");
  };
  mxG.G.prototype.runTransform = function(x, s) {
    var c1, c2, c3, c4, n1, n2, n3, n4, r, D, DX, DY;
    if (this.transform) {
      if (x == "SZ") {
        if (this.transform == 3) r = s.replace(/^([0-9]+):([0-9]+)$/, "$2:$1");
        else r = s;
        this.sz = r;
      } else if (
        x == "B" ||
        x == "W" ||
        x == "AB" ||
        x == "AW" ||
        x == "AE" ||
        x == "LB" ||
        x == "MA" ||
        x == "TR" ||
        x == "SQ" ||
        x == "CR" ||
        x == "VW" ||
        x == "AR" ||
        x == "DD" ||
        x == "LN" ||
        x == "SL"
      ) {
        D = this.sz.split(":");
        DX = parseInt(D[0]);
        DY = D.length > 1 ? parseInt(D[1]) : DX;
        c1 = s.substr(0, 1);
        c2 = s.substr(1, 1);
        n1 = c1.c2n();
        n2 = c2.c2n();
        if (x != "LB" && s.length == 5) {
          c3 = s.substr(3, 1);
          c4 = s.substr(4, 1);
          n3 = c3.c2n();
          n4 = c4.c2n();
        }
        if (this.transform == 1) {
          if (s.length == 5) {
            r = this.xy2s(n1, DY + 1 - n4);
            r += ":" + this.xy2s(n3, DY + 1 - n2);
          } else r = this.xy2s(n1, DY + 1 - n2);
        } else if (this.transform == 2) {
          if (s.length == 5) {
            r = this.xy2s(DX + 1 - n3, n2);
            r += ":" + this.xy2s(DX + 1 - n1, n4);
          } else r = this.xy2s(DX + 1 - n1, n2);
        } else if (this.transform == 3) {
          if (s.length == 5) {
            r = this.xy2s(n2, DY + 1 - n3);
            r += ":" + this.xy2s(n4, DY + 1 - n1);
          } else r = this.xy2s(n2, DY + 1 - n1);
        }
        if (x == "LB") r += s.substr(2);
      } else r = s;
    } else r = s;
    return r;
  };
  mxG.G.prototype.buildAllSgf = function(aN, only, c) {
    // build sgf tree starting at aN
    // if only&1, keep B, W, AB, AE, AW, FF, CA, GM, SZ, EV, RO, DT, PC, PB, BR, BT, PW, WR, WT, RU, TM, OT, HA, KM, RE, VW only
    // if only&2, keep main variation only
    // if only&4, keep variation on focus only (useful when show)
    // remove empty nodes
    var rc = "\n",
      k,
      x,
      y,
      ym,
      aText = "",
      first,
      keep;
    if (c === undefined) c = 0;
    if (this.transform && aN.Dad && aN.Dad == this.rN)
      this.sz = aN.P["SZ"] ? aN.P["SZ"] + "" : "19";
    if ((aN.Dad && aN.Dad == this.rN) || (aN.Dad && aN.Dad.Kid.length > 1)) {
      if (only & 4) {
        if (aN.Dad == this.rN && aN == this.kidOnFocus(aN.Dad)) aText += "(";
      } else if (only & 2) {
        if (aN.Dad == this.rN && aN == aN.Dad.Kid[0]) aText += "(";
      } else if (aN.Dad == this.rN && aN == aN.Dad.Kid[0]) aText += "(";
      else {
        aText += rc + "(";
        c = 0;
      }
    }
    if (aN != this.rN) {
      if (aText[aText.length - 1] != "(") {
        if (aN.Dad && aN.Dad.Dad && aN.Dad.Dad == this.rN) {
          aText += rc;
          c = 0;
        } else if (c > 3) {
          aText += rc;
          c = 0;
        } else c++;
      }
      first = 1;
      for (x in aN.P) {
        if (x.match(/^[A-Z]+$/)) {
          if (only & 1) {
            if (
              x == "B" ||
              x == "W" ||
              x == "AB" ||
              x == "AW" ||
              x == "AE" ||
              x == "FF" ||
              x == "CA" ||
              x == "GM" ||
              x == "SZ" ||
              x == "EV" ||
              x == "RO" ||
              x == "DT" ||
              x == "PC" ||
              x == "PB" ||
              x == "BR" ||
              x == "BT" ||
              x == "PW" ||
              x == "WR" ||
              x == "WT" ||
              x == "RU" ||
              x == "TM" ||
              x == "OT" ||
              x == "HA" ||
              x == "KM" ||
              x == "RE" ||
              x == "VW"
            )
              keep = 1;
            else keep = 0;
          } else keep = 1;
          if (keep) {
            if (first) {
              aText += ";";
              first = 0;
            } // discard empty node
            if (aN.Dad && aN.Dad == this.rN) {
              aText += rc;
              c = 0;
            } else if (x == "TB" || x == "TW") {
              aText += rc;
              c = 4;
            }
            aText += x;
            ym = aN.P[x].length;
            for (y = 0; y < ym; y++) {
              if (this.transform)
                aText +=
                  "[" + mxG.sgfEsc(this.runTransform(x, aN.P[x][y])) + "]";
              else aText += "[" + mxG.sgfEsc(aN.P[x][y]) + "]";
            }
          }
        }
      }
    }
    if (aN.Kid && aN.Kid.length) {
      if (only & 4) {
        if (aN != this.cN)
          aText += this.buildAllSgf(this.kidOnFocus(aN), only, c);
      } else if (only & 2) aText += this.buildAllSgf(aN.Kid[0], only, c);
      else
        for (k = 0; k < aN.Kid.length; k++)
          aText += this.buildAllSgf(aN.Kid[k], only, c);
    }
    if (only & 4) {
      if (aN.Dad == this.rN && aN == this.kidOnFocus(aN.Dad)) aText += ")";
    } else if (only & 2) {
      if (aN.Dad == this.rN && aN == aN.Dad.Kid[0]) aText += ")";
    } else {
      if ((aN.Dad && aN.Dad == this.rN) || (aN.Dad && aN.Dad.Kid.length > 1))
        aText += ")";
    }
    return aText;
  };
  mxG.G.prototype.sgfMandatory = function() {
    var p,
      km = this.rN.Kid.length;
    for (var k = 0; k < km; k++) {
      p = this.rN.Kid[k].P;
      p.FF = ["4"];
      p.CA = [this.toCharset];
      p.GM = ["1"];
      p.AP = ["maxiGos:" + mxG.V];
    }
  };
  mxG.G.prototype.buildSomeSgf = function(only) {
    this.sgfMandatory();
    return this.buildAllSgf(this.rN, only, 0);
  };
  mxG.G.prototype.buildSgf = function() {
    this.sgfMandatory();
    return this.buildAllSgf(
      this.rN,
      (this.sgfSaveCoreOnly ? 1 : 0) + (this.sgfSaveMainOnly ? 2 : 0),
      0
    );
  };
  mxG.G.prototype.popupSgf = function() {
    if (this.sgfPopup && !this.sgfPopup.closed) this.sgfPopup.close();
    this.sgfPopup = window.open();
    // some browsers (chrome, safari !!!) don't support 'text/plain', thus use default 'text/html'
    // use <pre> tag otherwise line breaks are replaced by spaces
    this.sgfPopup.document.open();
    this.sgfPopup.document.write("<!DOCTYPE html><html><body><pre>\n");
    this.sgfPopup.document.write(this.htmlProtect(this.buildSgf()));
    this.sgfPopup.document.write("\n</pre></body></html>");
    this.sgfPopup.document.close();
    this.sgfPopup.document.title = "Sgf"; // not working in all browsers
  };
  mxG.G.prototype.canDownloadSgf = function() {
    // also used by File component
    // seems downloaded file is always in UTF-8 (possible to change the charset?)
    // if toCharset is not UTF-8, don't download the file (just display sgf)
    if (this.toCharset != "UTF-8") return 0;
    return typeof document.createElement("a").download === "string" ? 1 : 0;
  };
  mxG.G.prototype.downloadSgf = function(f) {
    // also used by File component
    var u, a;
    if (this.canDownloadSgf()) {
      // Big5, gb18030, Shift_JIS, ... are they usable here?
      u = "data:application/octet-stream;charset=utf-8,";
      u += encodeURIComponent(this.buildSgf());
      a = document.createElement("a");
      document.body.appendChild(a); // firefox requires the link to be in the body
      a.download = f;
      a.href = u;
      a.click();
      document.body.removeChild(a);
    } else this.popupSgf(); // just display sgf in the browser
  };
  mxG.G.prototype.doDownloadSgf = function(f) {
    this.downloadSgf(f);
  };
  mxG.G.prototype.doReplaceFromSgf = function() {
    var s = this.getE("ShowSgfDiv").firstChild.value,
      sgf,
      k;
    if (s != this.sgfBeforeEdit) {
      this.mayHaveExtraTags = 0;
      k = this.rNs.indexOf(this.rN);
      sgf = this.rN.sgf ? this.rN.sgf : "";
      if (this.getE("WindowMenuDiv")) {
        this.rN.cN = this.cN;
      }
      this.rN = new mxG.P(s, this.sgfLoadCoreOnly, this.sgfLoadMainOnly);
      this.rN.sgf = sgf;
      if (this.getE("WindowMenuDiv")) this.rNs[k] = this.rN;
      this.backNode(this.kidOnFocus(this.rN));
      if (this.hasC("Tree")) this.hasToSetTree = 1;
    }
    this.hideGBox("ShowSgf");
  };
  mxG.G.prototype.doEditSgf = function() {
    var e;
    if (this.gBox == "ShowSgf") {
      this.hideGBox("ShowSgf");
      return;
    }
    if (!this.getE("ShowSgfDiv")) {
      var s = "";
      // textarea considerably faster than div contenteditable when pasting big sgf
      s += '<textarea class="mxShowContentTextarea">';
      s += "</textarea>";
      s += '<div class="mxOKDiv">';
      s +=
        '<button type="button" onclick="' +
        this.g +
        '.doReplaceFromSgf()"><span>' +
        this.local("OK") +
        "</span></button>";
      s +=
        '<button type="button" onclick="' +
        this.g +
        ".hideGBox('ShowSgf')\"><span>" +
        this.local("Cancel") +
        "</span></button>";
      s += "</div>";
      this.createGBox("ShowSgf").innerHTML = s;
    }
    this.sgfBeforeEdit = this.buildSgf();
    e = this.getE("ShowSgfDiv").firstChild;
    e.value = this.sgfBeforeEdit;
    this.showGBox("ShowSgf");
  };
  mxG.G.prototype.doShowSgf = function() {
    var e;
    if (this.gBox == "ShowSgf") {
      this.hideGBox("ShowSgf");
      return;
    }
    if (!this.getE("ShowSgfDiv")) {
      let s,
        z = this.k;
      s = '<div class="mxShowContentDiv" tabindex="0">';
      s += "</div>";
      s += '<div class="mxOKDiv">';
      s +=
        '<button type="button"><span>' +
        this.local(" Close ") +
        "</span></button>";
      s += "</div>";
      this.createGBox("ShowSgf").innerHTML = s;
      btn = this.getE("ShowSgfDiv").querySelector(".mxOKDiv button");
      btn.addEventListener(
        "click",
        function() {
          mxG.D[z].hideGBox("ShowSgf");
        },
        false
      );
    }
    e = this.getE("ShowSgfDiv").firstChild;
    e.innerHTML = this.htmlProtect(this.buildSgf());
    this.showGBox("ShowSgf");
  };
  mxG.G.prototype.doSgf = function() {
    if (this.sgfAction == "download") {
      window.parent.postMessage({ code: 10000 }, "*");

      this.doDownloadSgf(this.rN.sgf ? this.rN.sgf : "maxiGos.sgf");
    } else if (this.sgfAction == "edit") this.doEditSgf();
    else this.doShowSgf();
  };
  mxG.G.prototype.updateSgf = function() {
    if (this.getE("SgfBtn")) {
      if (this.gBox == "ShowSgf") this.selectBtn("Sgf");
      else this.unselectBtn("Sgf");
    }
  };
  mxG.G.prototype.initSgf = function() {
    if (this.sgfBtnOn)
      this.addBtn(this.getE("SgfDiv"), {
        n: "Sgf",
        v: this.alias("下载SGF", "sgfAlias")
      });
  };
  mxG.G.prototype.createSgf = function() {
    this.sgfAction = this.setA("sgfAction", "show", "string");
    this.sgfAlias = this.setA("sgfAlias", null, "string");
    this.sgfBtnOn = this.setA("sgfBtnOn", 0, "bool");
    this.toCharset = this.setA("toCharset", "UTF-8", "string");
    return this.createBtnBox("Sgf");
  };
}
// maxiGos v7 > mgosComment.js
if (!mxG.G.prototype.createComment) {
  mxG.fr("Comments", "Commentaire");
  mxG.fr("buildMove", function(k) {
    return "Coup " + k;
  });
  mxG.en("buildMove", function(k) {
    return "Move " + k;
  });
  mxG.G.prototype.getOneComment = function(aN) {
    var c = aN.P.C ? this.htmlProtect(aN.P.C[0]) : "";
    if (c) c = '<div class="mxP mxCommentP">' + c + "</div>";
    if (this.hasC("Header") && this.headerInComment && aN.Dad == this.rN)
      c = this.buildHeader() + c;
    return c.replace(/\n/g, "<br>");
  };
  mxG.G.prototype.getComment = function() {
    var aN = this.cN;
    if (this.allInComment) {
      var bN = this.rN,
        s = "",
        c,
        k = 0;
      while ((bN = this.kidOnFocus(bN))) {
        if (bN.P.B || bN.P.W) {
          k++;
          if ((bN.P.B && bN.Dad.P.B) || (bN.P.W && bN.Dad.P.W)) k++;
        } else if (bN.P.AB || bN.P.AW || bN.P.AE) k = 0;
        if ((c = this.getOneComment(bN))) {
          if (k)
            s +=
              '<div class="mxMoveNumberDiv">' +
              this.build("Move", k) +
              "</div>";
          s += c;
        }
        if (bN == aN) break;
      }
      return s;
    } else return this.getOneComment(aN);
  };
  mxG.G.prototype.disableComment = function() {
    var e = this.getE("CommentDiv");
    if (!e.hasAttribute("data-maxigos-disabled")) {
      e.setAttribute("data-maxigos-disabled", "1");
      if (this.canCommentFocus) e.setAttribute("tabindex", "-1");
    }
  };
  mxG.G.prototype.enableComment = function() {
    var e = this.getE("CommentDiv");
    if (e.hasAttribute("data-maxigos-disabled")) {
      e.removeAttribute("data-maxigos-disabled");
      if (this.canCommentFocus) e.setAttribute("tabindex", "0");
    }
  };
  mxG.G.prototype.isCommentDisabled = function() {
    return this.getE("CommentDiv").hasAttribute("data-maxigos-disabled");
  };
  mxG.G.prototype.updateComment = function() {
    var e = this.getE("CommentDiv");
    if (this.hasC("Solve") && this.canPlaceSolve) return;
    if (this.cN.P.BM) e.className = "mxCommentDiv mxBM";
    else if (this.cN.P.DO) e.className = "mxCommentDiv mxDO";
    else if (this.cN.P.IT) e.className = "mxCommentDiv mxIT";
    else if (this.cN.P.TE) e.className = "mxCommentDiv mxTE";
    else e.className = "mxCommentDiv";
    this.getE("CommentContentDiv").innerHTML = this.getComment();
    if (this.gBox) this.disableComment();
    else this.enableComment();
  };
  mxG.G.prototype.createComment = function() {
    var s = "",
      a = "";
    this.headerInComment = this.setA("headerInComment", 0, "bool");
    this.canCommentFocus = this.setA("canCommentFocus", 0, "bool");
    this.commentLabelOn = this.setA("commentLabelOn", 0, "bool");
    this.allInComment = this.setA("allInComment", 0, "bool");
    // add tabindex="0" to this div if it can be scrolled (for keyboard navigation)
    a = this.canCommentFocus ? ' tabindex="0"' : "";
    if (this.commentLabelOn) {
      s += '<div class="mxCommentLabelDiv" id="' + this.n + 'CommentLabelDiv">';
      s += this.local("Comments");
      s += "</div>";
    }
    s += '<div class="mxCommentDiv" id="' + this.n + 'CommentDiv"' + a + ">";
    s +=
      '<div class="mxCommentContentDiv" id="' + this.n + 'CommentContentDiv">';
    s += "</div>";
    s += "</div>";
    return s;
  };
}
// maxiGos v7 > mgosHeader.js
if (!mxG.G.prototype.createHeader) {
  mxG.fr("Header", "Informations");
  mxG.fr("Header_Short", "E");
  mxG.fr(" ", " ");
  mxG.fr(", ", ", ");
  mxG.fr(": ", " : ");
  mxG.fr(".", ",");
  mxG.fr("Black", "Noir");
  mxG.fr("White", "Blanc");
  mxG.fr(" wins", " gagne");
  mxG.fr("Date", "Date");
  mxG.fr("Place", "Lieu");
  mxG.fr("Time limits", "Durée");
  mxG.fr("Rules", "Règle");
  mxG.fr("Handicap", "Handicap");
  mxG.fr("Result", "Résultat");
  mxG.fr("none", "aucun");
  mxG.fr(" by resign", " par abandon");
  mxG.fr(" by time", " au temps");
  mxG.fr(" by forfeit", " par forfait");
  mxG.fr(" by ", " de ");
  mxG.fr("game with no result", "partie sans résultat");
  mxG.fr("draw", "partie nulle");
  mxG.fr("unknown result", "résultat inconnu");
  mxG.fr("Komi", "Komi ");
  mxG.fr(" point", " point");
  mxG.fr(" points", " points");
  mxG.fr(" Close ", "Fermer"); // add space to avoid confusion with menu "Close"
  mxG.fr("h", "h");
  mxG.fr("mn", "mn");
  mxG.fr("s", "s");
  mxG.fr(" per player", " par joueur");
  mxG.fr("Japanese", "japonaise");
  mxG.fr("Chinese", "chinoise");
  mxG.fr("Korean", "coréene");
  mxG.fr("GOE", "Ing");
  mxG.fr("AGA", "américaine / française");
  mxG.fr(" move", " coup");
  mxG.fr(" moves", " coups");
  mxG.fr("Number of moves", "Nombre de coups");
  mxG.fr("buildMonth", function(a) {
    var m = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre"
    ];
    return m[parseInt(a) - 1];
  });
  mxG.fr("buildDay", function(a) {
    if (a == "01") return '1<span class="sup">er</span>';
    return a.replace(/,([0-9]{2})/g, "-$1").replace(/0([1-9])/g, "$1");
  });
  mxG.fr("buildDate2", function(s) {
    var r,
      reg = /(^\s*([0-9]{2})(-([0-9]{2}(,[0-9]{2})*))?)(([^-])(.*))*\s*$/g;
    if (s.match(reg)) {
      r = s.replace(reg, "$8");
      m = s.replace(reg, "$2");
      d = s.replace(reg, "$4");
      return (
        (d ? mxG.Z.fr["buildDay"](d) + " " : "") +
        mxG.Z.fr["buildMonth"](m) +
        (r ? ", " + mxG.Z.fr["buildDate2"](r) : "")
      );
    }
    return s;
  });
  mxG.fr("buildDate", function(s) {
    var r,
      y,
      m,
      reg = /(^\s*([0-9]{4})(-([^\.]*))*)(\.)?(.*)\s*$/g,
      k,
      km,
      z;
    if (s.indexOf("~") >= 0) {
      r = s.split("~");
      km = r.length;
      z = mxG.Z.fr["buildDate"](r[0]);
      for (k = 1; k < km; k++) z += " ~ " + mxG.Z.fr["buildDate"](r[k]);
      return z;
    }
    s = s.replace(/,([0-9]{4})/g, ".$1");
    if (s.match(reg)) {
      r = s.replace(reg, "$6");
      y = s.replace(reg, "$2");
      m = s.replace(reg, "$4");
      return (
        (m ? mxG.Z.fr["buildDate2"](m) + " " : "") +
        y +
        (r ? ", " + mxG.Z.fr["buildDate"](r) : "")
      );
    }
    return s;
  });
  mxG.en("Header_Short", "H");
  // buildRules, buildTimeLimits, buildKomi, buildResult, buildNumOfMoves
  // are called by this.build()
  mxG.G.prototype.buildRules = function(a) {
    return this.local(a.ucFirst());
  };
  mxG.G.prototype.buildTimeLimits = function(a) {
    if (a.match(/^[0-9]+$/g)) {
      var r = "",
        t,
        h,
        mn,
        s;
      t = parseInt(a);
      h = Math.floor(t / 3600);
      if (h) r += h + this.local("h");
      mn = Math.floor((t - h * 3600) / 60);
      if (mn) r += (r ? this.local(" ") : "") + mn + this.local("mn");
      s = t - h * 3600 - mn * 60;
      if (s) r += (r ? this.local(" ") : "") + s + this.local("s");
      return r + this.local(" per player");
    }
    return a;
  };
  mxG.G.prototype.buildKomi = function(k) {
    var a = k + "",
      b;
    if (a.search(/^([0-9]+([,\.]([0-9]+)?)?)?$/) == 0) {
      b = parseFloat(a.replace(",", "."));
      if (b == 0) return this.local("none");
      if (b > -2 && b < 2) b += this.local(" point");
      else b += this.local(" points");
      return (b + "").replace(".", this.local("."));
    }
    return a;
  };
  mxG.G.prototype.buildResult = function(a) {
    var b = "";
    if (a.substr(0, 1) == "B") b = this.local("Black");
    else if (a.substr(0, 1) == "W") b = this.local("White");
    else if (a.substr(0, 1) == "V") return this.local("game with no result");
    else if (a.substr(0, 1) == "D") return this.local("draw");
    else if (a.substr(0, 1) == "0") return this.local("draw");
    else if (a.substr(0, 1) == "?") return this.local("unknown result");
    else return a;
    b += this.local(" wins");
    if (a.substr(1, 1) == "+") {
      if (a.substr(2, 1) == "R") b += this.local(" by resign");
      else if (a.substr(2, 1) == "T") b += this.local(" by time");
      else if (a.substr(2, 1) == "F") b += this.local(" by forfeit");
      else if (a.length > 2) {
        var c = parseFloat(a.substr(2).replace(",", "."));
        b += this.local(" by ") + c;
        if (c > -2 && c < 2) b += this.local(" point");
        else b += this.local(" points");
        b = b.replace(".", this.local("."));
      }
    }
    return b;
  };
  mxG.G.prototype.buildNumOfMoves = function(k) {
    return k + (k < 2 ? this.local(" move") : this.local(" moves"));
  };
  mxG.G.prototype.getNumOfMoves = function() {
    var aN = this.rN,
      n = 0,
      p = 0,
      ex = "E",
      v;
    while (this.kidOnFocus(aN)) {
      aN = aN.Kid[0];
      if (aN.P.B || aN.P.W) {
        n++;
        if (aN.P.B) v = aN.P.B[0];
        else v = aN.P.W[0];
        if (v) p = 0;
        else p++;
        if ((aN.P.B && ex == "B") || (aN.P.W && ex == "W")) {
          n++;
          if (p) p++;
        }
      } else if (aN.P.AB || aN.P.AW || aN.P.AE) ex = "E";
    }
    return n - p;
  };
  mxG.G.prototype.buildHeader = function() {
    var h = "",
      a = "",
      t = "",
      b,
      c,
      d,
      r;
    if (!this.hideTitle) {
      if (this.hasC("Title")) t = this.buildTitle();
      else {
        t = this.getInfoS("EV");
        a = this.getInfoS("RO");
        if (a) t += (t ? this.local(", ") : "") + a;
      }
      if (this.concatDateToTitle && (a = this.getInfoS("DT")))
        t += (t ? " (" : "") + this.build("Date", a) + (t ? ")" : "");
    }
    if (t) t = '<h1 class="mxTitleH1">' + t + "</h1>";
    if (this.hideBlack) a = "";
    else a = this.getInfoS("PB");
    if (a) {
      h +=
        '<span class="mxPBSpan"><span class="mxHeaderSpan">' +
        this.local("Black") +
        this.local(": ") +
        "</span>" +
        a;
      a = this.getInfoS("BR");
      if (a) h += this.local(" ") + this.build("Rank", a);
      if (this.concatTeamToPlayer && (b = this.getInfoS("BT")))
        h += (a ? " (" : "") + b + (a ? ")" : "");
      h += "</span><br>";
    }
    if (this.hideWhite) a = "";
    else a = this.getInfoS("PW");
    if (a) {
      h +=
        '<span class="mxPWSpan"><span class="mxHeaderSpan">' +
        this.local("White") +
        this.local(": ") +
        "</span>" +
        a;
      a = this.getInfoS("WR");
      if (a) h += this.local(" ") + this.build("Rank", a);
      if (this.concatTeamToPlayer && (b = this.getInfoS("WT")))
        h += (a ? " (" : "") + b + (a ? ")" : "");
      h += "</span><br>";
    }
    if (this.hideDate) a = "";
    else a = this.getInfoS("DT");
    if (a && !this.concatDateToTitle)
      h +=
        '<span class="mxDTSpan"><span class="mxHeaderSpan">' +
        this.local("Date") +
        this.local(": ") +
        "</span>" +
        this.build("Date", a) +
        "</span><br>";
    if (this.hidePlace) a = "";
    else a = this.getInfoS("PC");
    if (a)
      h +=
        '<span class="mxPCSpan"><span class="mxHeaderSpan">' +
        this.local("Place") +
        this.local(": ") +
        "</span>" +
        a +
        "</span><br>";
    if (this.hideRules) a = "";
    else a = this.getInfoS("RU");
    if (a)
      h +=
        '<span class="mxRUSpan"><span class="mxHeaderSpan">' +
        this.local("Rules") +
        this.local(": ") +
        "</span>" +
        this.build("Rules", a) +
        "</span><br>";
    if (this.hideTimeLimits) a = "";
    else a = this.getInfoS("TM");
    if (a)
      h +=
        '<span class="mxTMSpan"><span class="mxHeaderSpan">' +
        this.local("Time limits") +
        this.local(": ") +
        "</span>" +
        this.build("TimeLimits", a) +
        "</span><br>";
    if (this.hideKomi) a = "";
    else a = this.getInfoS("KM");
    if (a)
      b =
        '<span class="mxHeaderSpan">' +
        this.local("Komi") +
        this.local(": ") +
        "</span>" +
        this.build("Komi", a);
    else b = "";
    if (b && !this.concatKomiToResult)
      h += '<span class="mxKMSpan">' + b + "</span><br>";
    if (this.hideHandicap) a = "";
    else a = this.getInfoS("HA");
    if (a)
      c =
        '<span class="mxHeaderSpan">' +
        this.local("Handicap") +
        this.local(": ") +
        "</span>" +
        this.build("handicap", a);
    else c = "";
    if (c && !this.concatHandicapToResult)
      h += '<span class="mxHASpan">' + c + "</span><br>";
    if (!this.hideNumOfMoves) {
      a = this.getNumOfMoves() + "";
      if (this.hideNumOfMovesLabel) d = this.build("NumOfMoves", a);
      else
        d =
          '<span class="mxHeaderSpan">' +
          this.local("Number of moves") +
          this.local(": ") +
          "</span>" +
          a;
      if (!this.concatNumOfMovesToResult)
        h += '<span class="mxNMSpan">' + d + "</span><br>";
    } else d = "";
    if (!this.hideResult && (a = this.getInfoS("RE"))) {
      h += '<span class="mxRESpan">';
      r = this.build("Result", a);
      if (!this.hideResultLabel)
        h +=
          '<span class="mxHeaderSpan">' +
          this.local("Result") +
          this.local(": ") +
          "</span>" +
          r;
      else h += r.ucFirst();
      if (
        (d && this.concatNumOfMovesToResult) ||
        (c && this.concatHandicapToResult) ||
        (b && this.concatKomiToResult)
      ) {
        let b2, c2, d2;
        h += " (";
        if (d && this.concatNumOfMovesToResult) d2 = d;
        else d2 = "";
        if (c && this.concatHandicapToResult) c2 = c;
        else c2 = "";
        if (b && this.concatKomiToResult) b2 = b;
        else b2 = "";
        if (d2) h += d2;
        if (d2 && c2) h += "; ";
        if (c2) h += c2;
        if ((d2 || c2) && b2) h += "; ";
        if (b2) h += b2;
        h += ")";
      }
      h += "</span><br>";
    }
    if (h) h = '<div class="mxP">' + h + "</div>";
    if (!this.hideGeneralComment && (a = this.getInfoS("GC")))
      h +=
        '<div class="mxP mxGeneralCommentP">' +
        a.replace(/\n/g, "<br>") +
        "</div>";
    return '<div class="mxHeaderContentDiv">' + t + h + "</div>";
  };
  mxG.G.prototype.doHeader = function() {
    var e;
    if (this.gBox == "ShowHeader") {
      this.hideGBox("ShowHeader");
      return;
    }
    if (!this.getE("ShowHeaderDiv")) {
      let s = "",
        z = this.k;
      s += '<div class="mxShowContentDiv" tabindex="0">';
      s += "</div>";
      s += '<div class="mxOKDiv">';
      s +=
        '<button type="button"><span>' +
        this.local(" Close ") +
        "</span></button>";
      s += "</div>";
      this.createGBox("ShowHeader").innerHTML = s;
      btn = this.getE("ShowHeaderDiv").querySelector(".mxOKDiv button");
      btn.addEventListener(
        "click",
        function() {
          mxG.D[z].hideGBox("ShowHeader");
        },
        false
      );
    }
    e = this.getE("ShowHeaderDiv").firstChild;
    e.innerHTML = this.buildHeader();
    this.showGBox("ShowHeader");
  };
  mxG.G.prototype.updateHeader = function() {
    if (this.headerBoxOn) {
      let h = this.buildHeader();
      if (h != this.header) {
        this.getE("HeaderDiv").innerHTML = h;
        this.header = h;
      }
    }
    if (this.getE("HeaderBtn")) {
      if (this.gBox == "ShowHeader") this.selectBtn("Header");
      else this.unselectBtn("Header");
    }
  };
  mxG.G.prototype.initHeader = function() {
    if (this.headerBtnOn)
      this.addBtn(this.getE("HeaderDiv"), {
        n: "Header",
        v: this.alias("Header", "headerAlias")
      });
  };
  mxG.G.prototype.createHeader = function() {
    var s = "",
      a = "";
    this.canHeaderFocus = this.setA("canHeaderFocus", 0, "bool");
    this.concatDateToTitle = this.setA("concatDateToTitle", 0, "bool");
    this.concatTeamToPlayer = this.setA("concatTeamToPlayer", 0, "bool");
    this.concatKomiToResult = this.setA("concatKomiToResult", 0, "bool");
    this.concatHandicapToResult = this.setA(
      "concatHandicapToResult",
      0,
      "bool"
    );
    this.concatNumOfMovesToResult = this.setA(
      "concatNumOfMovesToResult",
      0,
      "bool"
    );
    this.headerAlias = this.setA("headerAlias", null, "string");
    this.headerBoxOn = this.setA("headerBoxOn", 0, "bool");
    this.headerBtnOn = this.setA("headerBtnOn", 0, "bool");
    this.hideBlack = this.setA("hideBlack", 0, "bool");
    this.hideDate = this.setA("hideDate", 0, "bool");
    this.hideGeneralComment = this.setA("hideGeneralComment", 0, "bool");
    this.hideKomi = this.setA("hideKomi", 0, "bool");
    this.hideHandicap = this.setA("hideHandicap", 0, "bool");
    this.hideNumOfMoves = this.setA("hideNumOfMoves", 0, "bool");
    this.hideNumOfMovesLabel = this.setA("hideNumOfMovesLabel", 0, "bool");
    this.hidePlace = this.setA("hidePlace", 0, "bool");
    this.hideResult = this.setA("hideResult", 0, "bool");
    this.hideResultLabel = this.setA("hideResultLabel", 0, "bool");
    this.hideRules = this.setA("hideRules", 0, "bool");
    this.hideTimeLimits = this.setA("hideTimeLimits", 0, "bool");
    this.hideTitle = this.setA("hideTitle", 0, "bool");
    this.hideWhite = this.setA("hideWhite", 0, "bool");
    if (this.headerBoxOn || this.headerBtnOn) {
      // add tabindex="0" to this div if it can be scrolled (for keyboard navigation)
      a = this.headerBoxOn && this.canHeaderFocus ? ' tabindex="0"' : "";
      s += '<div class="mxHeaderDiv" id="' + this.n + 'HeaderDiv"' + a + ">";
      s += "</div>";
    }
    return s;
  };
}
// maxiGos v7 > mgosTitle.js
if (!mxG.G.prototype.createTitle) {
  mxG.fr(", ", ", ");
  mxG.fr("translateTitle", function(ev, ro) {
    var s = ev + "",
      a = ro + "",
      c = "",
      of = "",
      t = "",
      between = "";
    if (a != "") {
      if (a.search(/^([0-9]+)$/) == 0) t = "ronde";
      else if (
        a.search(
          /[ ]*\((final|semi-final|quarter-final|playoff|game|round)\)/i
        ) >= 0
      ) {
        if (s.search(/[ ]+(cup|league)/i) >= 0) of = " de la ";
        else if (s) of = " du ";
        if (a.search(/[ ]*\(final\)/i) >= 0) {
          c = "Finale" + of;
          t = "partie";
        } else if (a.search(/[ ]*\(semi-final\)/i) >= 0) {
          c = "Demi-finale" + of;
          t = "partie";
        } else if (a.search(/[ ]*\(quarter-final\)/i) >= 0) {
          c = "Quart de finale" + of;
          t = "partie";
        } else if (a.search(/[ ]*\(playoff\)/i) >= 0) {
          c = "Playoff" + of;
          t = "partie";
        } else if (a.search(/[ ]*\(game\)/i) >= 0) t = "partie";
        else t = "tour";
        a = a.replace(
          /[ ]*\((final|semi-final|quarter-final|playoff|game|round)\)/i,
          ""
        );
      } else if (a.search(/[ ]*\(final tournament\)/i) >= 0) {
        if (s.search(/[ ]+(cup|league)/i) >= 0) of = " de la ";
        else if (s) of = " du ";
        c = "Tournoi final" + of;
        t = "ronde";
        a = a.replace(/[ ]*\(final tournament\)/i, "");
      }
      if (a.search(/^([0-9]+)/) == 0)
        a = a.replace(/^([0-9]+)(.*)/, t + (t ? " " : "") + "$1$2");
    }
    if (s.search(/^([0-9]+)(st|nd|rd|th)/i) >= 0) {
      s = s.replace(
        /^([0-9]+)(st|nd|rd|th)[ ]+Female[ ]+(.*)$/i,
        "$1$2 $3 féminin"
      );
      s = s.replace(
        /^([0-9]+)(st|nd|rd|th)[ ]+(Former|Old)[ ]+(.*)$/i,
        "$1$2 ancien $4"
      );
      s = s.replace(/^([0-9]+)(st|nd|rd|th)/i, '$1<span class="sup">e</span>');
      s = s.replace(
        /^1<span class=\"sup\">e<\/span>/,
        s.search(/[ ]+(cup|league)/i) >= 0
          ? '1<span class="sup">re</span>'
          : '1<span class="sup">er</span>'
      );
    }
    s = c + s;
    if (s && a.search(/^[a-zA-Z0-9]/) == 0) s += ", ";
    else if (s && a) s += " ";
    if (s) s = s.ucFirst();
    else if (a) a = a.ucFirst();
    if (s) s = '<span class="mxEVTitleSpan">' + s + "</span>";
    if (a) a = '<span class="mxROTitleSpan">' + a + "</span>";
    return s + a;
  });
  mxG.en("translateTitle", function(ev, ro) {
    var s = ev + "",
      a = ro + "",
      c = "",
      t = "",
      before = "",
      between = "";
    if (a != "") {
      if (a.search(/^([0-9]+)$/) == 0) t = "round";
      if (
        a.search(
          /[ ]*\((final|semi-final|quarter-final|playoff|game|round)\)/i
        ) >= 0
      ) {
        if (s) before = ", ";
        if (a.search(/[ ]*\(final\)/i) >= 0) {
          c = before + "final";
          t = "game";
        } else if (a.search(/[ ]*\(semi-final\)/i) >= 0) {
          c = before + "semi-final";
          t = "game";
        } else if (a.search(/[ ]*\(quarter-final\)/i) >= 0) {
          c = before + "quarter-final";
          t = "game";
        } else if (a.search(/[ ]*\(playoff\)/i) >= 0) {
          c = before + "playoff";
          t = "game";
        } else if (a.search(/[ ]*\(game\)/i) >= 0) t = "game";
        else t = "round";
        a = a.replace(
          /[ ]*\((final|semi-final|quarter-final|playoff|game|round)\)/i,
          ""
        );
      } else if (a.search(/[ ]*\(final tournament\)/i) >= 0) {
        if (s) before = ", ";
        c = before + "final tournament";
        t = "round";
        a = a.replace(/[ ]*\(final tournament\)/i, "");
      }
      if (a.search(/^([0-9]+)/) == 0)
        a = a.replace(/^([0-9]+)(.*)/, t + (t ? " " : "") + "$1$2");
    }
    s = s + c;
    if (s && a.search(/^\(/) == 0) between = " ";
    else if (s && a) between = ", ";
    s = s + between + a;
    return s.ucFirst();
  });
  mxG.G.prototype.buildTitle = function() {
    var ev, ro, f;
    ev = this.getInfoS("EV");
    ro = this.getInfoS("RO");
    if (this.translateTitleOn) f = "translateTitle";
    else f = "buildTitle";
    if (mxG.Z[this.lang] && mxG.Z[this.lang][f])
      return mxG.Z[this.lang][f](ev, ro);
    return ev + (ev && ro ? this.local(", ") : "") + ro;
  };
  mxG.G.prototype.updateTitle = function() {
    if (this.titleBoxOn) {
      let t = this.buildTitle();
      if (this.title != t) {
        this.getE("TitleH1").innerHTML = t;
        this.title = t;
      }
    }
  };
  mxG.G.prototype.initTitle = function() {
    if (this.titleBoxOn) this.title = "";
  };
  mxG.G.prototype.createTitle = function() {
    var s = "";
    this.titleBoxOn = this.setA("titleBoxOn", 0, "bool");
    this.translateTitleOn = this.setA("translateTitleOn", 0, "bool");
    if (this.titleBoxOn)
      s += '<h1 class="mxTitleH1" id="' + this.n + 'TitleH1"></h1>';
    return s;
  };
}
// maxiGos v7 > mgosTree.js
if (!mxG.G.prototype.createTree) {
  mxG.fr("Game tree", "Arbre des coups");
  mxG.G.prototype.idt = function(x, y) {
    return x + "_" + y;
  };
  mxG.G.prototype.getTreeRatio = function() {
    // return (size in px)/(size in svg corrdinates) ratio
    var e = this.getE("TreeBlockSvg" + this.idt(0, 0)),
      w = this.ddT * this.treeM,
      b = e.getBoundingClientRect();
    return b.width / w;
  };
  mxG.G.prototype.getCT = function(ev, xo, yo) {
    var e = this.getE("TreeBlockSvg" + this.idt(xo, yo)),
      w = this.ddT * this.getTreeRatio(),
      c = e.getMClick(ev),
      x,
      y;
    x = xo + Math.floor(c.x / w);
    y = yo + Math.floor(c.y / w);
    return { x: x, y: y };
  };
  mxG.G.prototype.doClickTree = function(ev, xo, yo) {
    var aN, c, x, y;
    if (this.isTreeDisabled()) return;
    c = this.getCT(ev, xo, yo);
    x = c.x;
    y = c.y;
    if (this.tree[y] != undefined && this.tree[y][x] != undefined) {
      aN = this.tree[y][x];
      this.backNode(aN);
      this.updateAll();
    }
    // keep focus on tree
    // arrow keys are for scrolling the tree
    // if the user want to use arrow keys to navigate,
    // he has to go back to navigation bar
  };
  mxG.G.prototype.doScrollTree = function(ev) {
    if (this.treeLock) return;
    var w = this.ddT * this.getTreeRatio(),
      st = this.td.scrollTop,
      y = Math.floor(st / w),
      n = this.treeN,
      ko = Math.floor(y / n),
      k,
      km;
    // add visible blocks around block #ko
    this.addVisibleTreeBlocksOnly(ko);
  };
  mxG.G.prototype.buildOneTreeBlockContainer = function(x, y) {
    var gr,
      dd = this.ddT,
      k = this.k,
      m = this.treeM,
      n = this.treeN;
    n = Math.min(n, this.treeRowMax - y);
    gr = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    gr.setAttribute("id", this.n + "TreeBlockSvg" + this.idt(x, y));
    gr.setAttributeNS(null, "viewBox", "0 0 " + m * dd + " " + n * dd);
    gr.setAttributeNS(null, "font-size", "14"); // 14 if stone diameter is 23
    gr.setAttributeNS(null, "font-family", "arial,sans-serif");
    gr.setAttributeNS(null, "text-anchor", "middle");
    gr.setAttributeNS(null, "fill", "none");
    gr.setAttributeNS(null, "stroke", "#000");
    // gr.setAttributeNS(null,"stroke-width","1"); // already done by default
    // ready to display tree lines without modifying stroke and fill attributes
    gr.style.display = "block";
    gr.style.width = "calc(" + this.treeM + " * 2.5em)";
    gr.style.maxWidth = "none"; // to be sure (some cms may set it to 100%)
    gr.getMClick = mxG.getMClick;
    if (gr.addEventListener)
      gr.addEventListener(
        "click",
        function(ev) {
          mxG.D[k].doClickTree(ev, x, y);
        },
        false
      );
    return gr;
  };
  mxG.G.prototype.buildTreeBlocksContainer = function() {
    var i, j, n, m;
    m = this.treeColumnMax;
    n = this.treeN;
    this.treeBlocks = [];
    k = 0;
    for (j = 0; j < this.treeRowMax; j = j + n)
      for (i = 0; i < this.treeColumnMax; i = i + m)
        this.treeBlocks.push(this.buildOneTreeBlockContainer(i, j));
  };
  mxG.G.prototype.drawTreeLine = function(s, x, y, c) {
    var e,
      d,
      dd,
      r,
      r2,
      r3,
      xo,
      yo,
      x1,
      y1,
      x2,
      y2,
      n = this.treeN;
    if (!c) c = "#000";
    k = Math.floor(y / n);
    d = this.dT;
    dd = this.ddT;
    r = d / 2;
    r2 = r / 2;
    r3 = r2 + 0.15 * d;
    xo = x * dd;
    yo = (y - k * n) * dd;
    x1 = xo + r2 + r;
    y1 = yo + r2 + r;
    x2 = xo + dd;
    y2 = yo + dd;
    gr = this.treeBlocks[k];
    e = document.createElementNS("http://www.w3.org/2000/svg", "path");
    e.setAttributeNS(null, "stroke", c);
    if (s == "H2L")
      e.setAttributeNS(
        null,
        "d",
        "M" + xo + " " + y1 + "L" + (xo + r2) + " " + y1
      );
    else if (s == "D2TL")
      e.setAttributeNS(
        null,
        "d",
        "M" + xo + " " + yo + "L" + (xo + r3) + " " + (yo + r3)
      );
    else if (s == "H2R")
      e.setAttributeNS(
        null,
        "d",
        "M" + (x2 - r2) + " " + y1 + "L" + x2 + " " + y1
      );
    else if (s == "D2BR")
      e.setAttributeNS(
        null,
        "d",
        "M" + (x2 - r3) + " " + (y2 - r3) + "L" + x2 + " " + y2
      );
    else if (s == "V2B")
      e.setAttributeNS(
        null,
        "d",
        "M" + x1 + " " + (y2 - r2) + "L" + x1 + " " + y2
      );
    else if (s == "V1")
      e.setAttributeNS(null, "d", "M" + x1 + " " + yo + "L" + x1 + " " + y2);
    else if (s == "A1")
      e.setAttributeNS(
        null,
        "d",
        "M" + x1 + " " + yo + "L" + x1 + " " + y1 + "L" + x2 + " " + y2
      );
    else if (s == "T1")
      e.setAttributeNS(
        null,
        "d",
        "M" +
          x1 +
          " " +
          yo +
          "L" +
          x1 +
          " " +
          y2 +
          "M" +
          x1 +
          " " +
          y1 +
          "L" +
          x2 +
          " " +
          y2
      );
    e.classList.add("mxTreeLine");
    this.treeBlocks[k].appendChild(e);
  };
  mxG.G.prototype.hasEmphasis = function(aN) {
    // for customization
    if (aN == this.cN) return this.goodnessCode.Focus;
    return 0;
  };
  mxG.G.prototype.makeTreeTriangle = function(x, y, d, c, cls) {
    var e, x1, y1, x2, y2, x3, y3, z;
    z = d * 0.32;
    x1 = x;
    y1 = y - z;
    x2 = x - z;
    y2 = y + z * 0.8;
    x3 = x + z;
    y3 = y + z * 0.8;
    e = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    e.setAttributeNS(null, "fill", "none");
    e.setAttributeNS(null, "stroke", c);
    e.setAttributeNS(
      null,
      "points",
      x1 + " " + y1 + " " + x2 + " " + y2 + " " + x3 + " " + y3
    );
    e.classList.add(cls);
    return e;
  };
  mxG.G.prototype.buildTreeEmphasis = function(x, y, d, c, cls) {
    var e,
      z = d * 0.625;
    e = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    e.setAttributeNS(null, "fill", c ? c : "rgba(0,0,0,0.1)");
    e.setAttributeNS(null, "stroke", "none");
    e.setAttributeNS(null, "x", x - z);
    e.setAttributeNS(null, "y", y - z);
    e.setAttributeNS(null, "width", z * 2);
    e.setAttributeNS(null, "height", z * 2);
    e.classList.add(cls);
    return e;
  };
  mxG.G.prototype.drawTreePoint = function(aN) {
    var gr,
      e,
      d,
      r,
      r2,
      rg,
      a,
      cx,
      cy,
      nat,
      s = "",
      x,
      y,
      xo,
      yo,
      xx,
      yy,
      dd,
      c,
      ac,
      cls,
      good,
      n = this.treeN,
      m = this.treeM;
    if (aN.P["B"]) nat = "B";
    else if (aN.P["W"]) nat = "W";
    else nat = "KA";
    if (!this.hideTreeNumbering && (nat == "B" || nat == "W")) {
      if (aN.P.C && this.markCommentOnTree) s = "?";
      else s = this.getAsInTreeNum(aN) + "";
    }
    x = aN.iTree;
    y = aN.jTree;
    xx = Math.floor(x / m) * m;
    yy = Math.floor(y / n) * n;
    d = this.dT;
    r = d / 2;
    r2 = r / 2;
    dd = this.ddT;
    xo = (x - xx) * dd;
    yo = (y - yy) * dd;
    cx = xo + r2 + r;
    cy = yo + r2 + r;
    gr = this.treeBlocks[yy / n];
    if ((good = this.hasEmphasis(aN))) {
      c = this.getEmphasisColor(good);
      cls = this.getEmphasisClass(good);
      e = this.buildTreeEmphasis(cx, cy, d, c, cls);
      e.setAttribute("id", this.n + "TreeEmphasis" + this.idt(x, y));
      gr.appendChild(e);
    }
    if (nat == "B" || nat == "W") {
      c = nat == "B" ? "Black" : "White";
      ac = nat == "B" ? "White" : "Black";
      if (this.stoneShadowOn) {
        let sw = this.scr.stoneShadowWidth;
        e = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        e.setAttribute("id", this.n + "TreeNodeShadow" + this.idt(x, y));
        e.setAttributeNS(null, "cx", cx + sw);
        e.setAttributeNS(null, "cy", cy + sw);
        e.setAttributeNS(null, "r", r);
        e.setAttributeNS(null, "fill", "rgba(0,0,0,0.2)");
        e.setAttributeNS(null, "stroke", "none");
        gr.appendChild(e);
      }
      e = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      e.setAttribute("id", this.n + "TreeNode" + this.idt(x, y));
      e.setAttributeNS(null, "cx", cx);
      e.setAttributeNS(null, "cy", cy);
      e.setAttributeNS(null, "r", r);
      if (this.in3dOn) {
        rg = this.specialStoneOn ? "A" : "";
        e.setAttributeNS(
          null,
          "fill",
          "url(#" + this.n + c + "RadialGradient" + rg + ")"
        );
        e.setAttributeNS(null, "stroke", "none");
      } else {
        e.setAttributeNS(null, "fill", c);
        e.setAttributeNS(null, "stroke", "Black");
      }
      e.classList.add("mx" + c);
      gr.appendChild(e);
      if (this.in3dOn && this.specialStoneOn) {
        e = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        e.setAttribute("id", this.n + "TreeNode" + this.idt(x, y));
        e.setAttributeNS(null, "cx", cx);
        e.setAttributeNS(null, "cy", cy);
        e.setAttributeNS(null, "r", r);
        e.classList.add("mx" + c);
        rg = this.specialStoneOn ? "B" : "";
        if (c == "White") {
          a = this.alea8[((x >> 1) + y) % 8];
          rg += a ? a : "";
        }
        e.setAttributeNS(
          null,
          "fill",
          "url(#" + this.n + c + "RadialGradient" + rg + ")"
        );
        e.setAttributeNS(null, "stroke", "none");
        gr.appendChild(e);
      }
      if (s) {
        let dy = 5; // vertical align need 5/14*font-size
        e = document.createElementNS("http://www.w3.org/2000/svg", "text");
        e.setAttributeNS(null, "x", cx);
        e.setAttributeNS(null, "y", cy + dy);
        e.setAttributeNS(null, "fill", ac);
        e.setAttributeNS(null, "stroke", ac);
        e.setAttributeNS(null, "stroke-width", "0.5");
        if (s.length > 1) {
          // using svg transform seems to be the safest way to shrink text width
          let v;
          v = "translate(" + cx + ",0)";
          if (s.length > 2) v += " scale(0.8,1)";
          else v += " scale(0.9,1)";
          v += " translate(-" + cx + ",0)";
          e.setAttributeNS(null, "transform", v);
        }
        e.classList.add = "mxOn" + c;
        e.textContent = s;
        gr.appendChild(e);
      }
    } else {
      e = this.makeTreeTriangle(cx, cy, d, "#000", "mxMark");
      e.setAttribute("id", this.n + "TreeNode" + this.idt(x, y));
      gr.appendChild(e);
    }
    if (x) {
      // from dad line
      c = this.getEmphasisColor(aN.Good);
      if (this.tree[y][x - 1] == aN.Dad) this.drawTreeLine("H2L", x, y, c);
      else this.drawTreeLine("D2TL", x, y, c);
    }
    if (aN.Kid && aN.Kid.length) {
      // to kids lines
      if (
        this.tree[y][x + 1] != undefined &&
        this.tree[y][x + 1] != undefined &&
        this.tree[y][x + 1].Dad == aN
      ) {
        c = this.getEmphasisColor(this.tree[y][x + 1].Good);
        this.drawTreeLine("H2R", x, y, c);
      }
      if (
        this.tree[y + 1] != undefined &&
        this.tree[y + 1][x + 1] != undefined &&
        this.tree[y + 1][x + 1].Dad == aN
      ) {
        c = this.getEmphasisColor(this.tree[y + 1][x + 1].Good);
        this.drawTreeLine("D2BR", x, y, c);
      }
      if (
        this.tree[y + 1] != undefined &&
        this.tree[y + 1][x] != undefined &&
        (this.tree[y + 1][x].Shape == -1 ||
          this.tree[y + 1][x].Shape == -2 ||
          this.tree[y + 1][x].Shape == -3)
      ) {
        c = this.getEmphasisColor(this.tree[y + 1][x].Good);
        this.drawTreeLine("V2B", x, y, c);
      }
    }
  };
  mxG.G.prototype.computeGoodness = function(aN, good) {
    // for customization
    return 0;
  };
  mxG.G.prototype.buildTree = function(aN, io, jo) {
    var i = io,
      j = jo,
      k,
      km = aN.Kid.length,
      l,
      good = 0,
      path,
      p,
      pm;
    if (!this.uC) this.setPl();
    if (j == this.treeRowMax) {
      this.tree[j] = [];
      this.treeRowMax++;
    }
    this.tree[j][i] = aN;
    aN.iTree = i;
    aN.jTree = j;
    for (k = 0; k < km; k++) {
      path = [];
      while (this.tree[j] !== undefined && this.tree[j][i + 1] !== undefined) {
        if (this.tree[j][i] === undefined) {
          if (
            this.tree[j + 1] === undefined ||
            this.tree[j + 1][i + 1] === undefined
          ) {
            if (k == km - 1) {
              this.tree[j][i] = { Shape: -1, Good: 0 }; // A1
              path.push({ i: i, j: j });
            } else {
              this.tree[j][i] = { Shape: -2, Good: 0 }; // T1
              path.push({ i: i, j: j });
            }
          } else {
            this.tree[j][i] = { Shape: -3, Good: 0 }; // V1
            path.push({ i: i, j: j });
          }
        }
        j++;
      }
      good = good | this.buildTree(aN.Kid[k], i + 1, j);
      pm = path.length;
      for (p = 0; p < pm; p++) {
        this.tree[path[p].j][path[p].i].Good = aN.Kid[k].Good;
      }
    }
    this.treeColumnMax = Math.max(this.treeColumnMax, i + 1);
    return (aN.Good = this.computeGoodness(aN, good));
  };
  mxG.G.prototype.drawTreeBlock = function(k, nv) {
    // draw part of tree only (nv lines from line #k)
    var i, j, jo, jm, c;
    jo = Math.max(0, k);
    jm = Math.min(k + nv, this.treeRowMax);
    for (j = jo; j < jm; j++) {
      if (!this.treeCheck[j]) {
        this.treeCheck[j] = 1;
        for (i = 0; i < this.treeColumnMax; i++)
          if (this.tree[j] != undefined && this.tree[j][i] != undefined) {
            if (this.tree[j][i] && this.tree[j][i].Dad)
              this.drawTreePoint(this.tree[j][i]);
            else {
              // not an object thus add V1, T1, A1
              if (this.tree[j][i])
                c = this.getEmphasisColor(this.tree[j][i].Good);
              if (this.tree[j][i] && this.tree[j][i].Shape == -1)
                this.drawTreeLine("A1", i, j, c);
              else if (this.tree[j][i] && this.tree[j][i].Shape == -2)
                this.drawTreeLine("T1", i, j, c);
              else if (this.tree[j][i] && this.tree[j][i].Shape == -3)
                this.drawTreeLine("V1", i, j, c);
            }
          }
      }
    }
  };
  mxG.G.prototype.afterDrawTree = function() {
    // for customization
    this.scrollTreeToShowFocus();
  };
  mxG.G.prototype.drawTree = function() {
    var nv, k, ko, km, e;
    this.treeCheck = [];
    this.buildTreeBlocksContainer();
    nv = Math.min(this.treeN, this.treeRowMax);
    ko = Math.floor(this.cN.jTree / this.treeN);
    // draw around current node only
    for (k = ko - 1; k <= ko + 1; k++) this.drawTreeBlock(k * this.treeN, nv);
    km = this.treeBlocks.length;
    // remove previously appended blocks to TreeContentDiv at the very last moment
    while ((e = this.tcd.firstChild)) this.tcd.removeChild(e);
    // append blocks to TreeContentDiv
    for (k = 0; k < km; k++) this.tcd.appendChild(this.treeBlocks[k]);
    this.afterDrawTree();
  };
  mxG.G.prototype.scrollTreeToShowFocus = function() {
    var e,
      i,
      j,
      r,
      left,
      top,
      right,
      bottom,
      width,
      height,
      scrollLeft,
      scrollTop;
    if (!this.treeNodeOnFocus) return;
    e = this.td;
    i = this.treeNodeOnFocus.iTree;
    j = this.treeNodeOnFocus.jTree;
    dd = this.ddT;
    r = this.getTreeRatio();
    left = dd * i * r;
    top = dd * j * r;
    right = left + dd * r + 1;
    bottom = top + dd * r + 1;
    if (e.clientWidth === undefined) return;
    width = e.clientWidth; // clientWidth=offsetWidth-scrollBarSize in theory?
    if (!width) return;
    if (e.clientHeight === undefined) return;
    height = e.clientHeight; // clientHeight=offsetHeight-scrollBarSize in theory?
    if (!height) return;
    if (e.scrollLeft === undefined) return;
    scrollLeft = e.scrollLeft;
    if (e.scrollTop === undefined) return;
    scrollTop = e.scrollTop;
    if (left < scrollLeft) e.scrollLeft = left;
    else if (right - width > scrollLeft) e.scrollLeft = right - width;
    if (top < scrollTop) e.scrollTop = top;
    else if (bottom - height > scrollTop) e.scrollTop = bottom - height;
  };
  mxG.G.prototype.disableTree = function() {
    if (!this.td.hasAttribute("data-maxigos-disabled")) {
      this.td.setAttribute("data-maxigos-disabled", "1");
      if (this.canTreeFocus) this.td.setAttribute("tabindex", "-1");
    }
  };
  mxG.G.prototype.enableTree = function() {
    if (this.td.hasAttribute("data-maxigos-disabled")) {
      this.td.removeAttribute("data-maxigos-disabled");
      if (this.canTreeFocus) this.td.setAttribute("tabindex", "0");
    }
  };
  mxG.G.prototype.isTreeDisabled = function() {
    return this.td.hasAttribute("data-maxigos-disabled");
  };
  mxG.G.prototype.setTree = function() {
    // remember: remove previous treeContentDiv child at the very last moment
    var k,
      km = this.rN.Kid.length,
      aN;
    this.tree = [];
    this.treeRowMax = 0;
    this.treeColumnMax = 0;
    for (k = 0; k < km; k++) {
      aN = this.rN.Kid[k];
      while (this.kidOnFocus(aN)) aN = this.kidOnFocus(aN);
      this.treeCurrentLast = aN;
      this.buildTree(this.rN.Kid[k], 0, this.treeRowMax);
    }
    this.treeM = this.treeColumnMax;
    this.treeN = 20; // assume no more than 20 visible lines in TreeDiv
    this.drawTree();
    this.treeNodeOnFocus = this.cN;
    this.hasToSetTree = 0;
  };
  mxG.G.prototype.removeAllTreeBlocks = function() {
    var k, km, nv, gr, jo, j, jm;
    km = this.treeBlocks.length;
    nv = Math.min(this.treeN, this.treeRowMax);
    for (k = 0; k < km; k++) {
      gr = this.treeBlocks[k];
      while (gr.firstChild) gr.removeChild(gr.firstChild);
      jo = k * nv;
      jm = jo + nv;
      for (j = jo; j < jm; j++) this.treeCheck[j] = 0;
    }
  };
  mxG.G.prototype.addVisibleTreeBlocksOnly = function(ko) {
    // add only some blocks that are visible or nearly visible in tree content
    // otherwise window resize or window may be very slow when big tree
    // ko is the indice of a visible block in this.treeBlocks
    // assume ko block is at least half of the visible part of the tree
    // thus add also some blocks around ko to try to miss nothing
    // remove other blocks content to minimize the number of tree content elements
    var k, km, nv, gr, jo, j, jm;
    this.treeLock = 1; // to avoid problems when scroll tree
    km = this.treeBlocks.length;
    nv = Math.min(this.treeN, this.treeRowMax);
    for (k = 0; k < km; k++) {
      gr = this.treeBlocks[k];
      if (k < ko - 1 || k > ko + 1) {
        // remove block #k
        if (gr.firstChild) {
          while (gr.firstChild) gr.removeChild(gr.firstChild);
          jo = k * nv;
          jm = jo + nv;
          for (j = jo; j < jm; j++) this.treeCheck[j] = 0;
        }
      } else if (!gr.firstChild) {
        // add block #k
        this.drawTreeBlock(k * nv, nv);
      }
      // else keep block #k as is
    }
    this.treeLock = 0;
  };
  mxG.G.prototype.updateTreeEmphasis = function() {
    var aN, i, j, e, good, treeNode, cx, cy, d, c, cls;
    if (this.treeNodeOnFocus == this.cN) return;
    if (this.treeNodeOnFocus) {
      aN = this.treeNodeOnFocus;
      i = aN.iTree;
      j = aN.jTree;
      e = this.getE("TreeEmphasis" + this.idt(i, j));
      if (e) {
        good = this.hasEmphasis(aN);
        if (good) {
          // todo when complex emphasis
        } else e.parentNode.removeChild(e);
      }
    }
    aN = this.cN;
    if ((good = this.hasEmphasis(aN))) {
      i = aN.iTree;
      j = aN.jTree;
      treeNode = this.getE("TreeNode" + this.idt(i, j));
      if (treeNode) {
        e = this.getE("TreeEmphasis" + this.idt(i, j));
        if (e) e.parentNode.removeChild(e);
        d = this.dT + 2;
        if (treeNode.tagName == "circle") {
          cx = treeNode.getAttributeNS(null, "cx");
          cy = treeNode.getAttributeNS(null, "cy");
        } else if (treeNode.tagName == "polygon") {
          points = treeNode.getAttributeNS(null, "points");
          cx = parseFloat(points.replace(/^([0-9.]+).*$/, "$1"));
          cy =
            parseFloat(points.replace(/^[0-9.]+ ([0-9.]+).*$/, "$1")) +
            d * 0.32;
        } else {
          // never in theory
          this.treeNodeOnFocus = aN;
          return;
        }
        c = this.getEmphasisColor(good);
        cls = this.getEmphasisClass(good);
        e = this.buildTreeEmphasis(cx, cy, d, c, cls);
        e.setAttribute("id", this.n + "TreeEmphasis" + this.idt(i, j));
        if ((treeNodeShadow = this.getE("TreeNodeShadow" + this.idt(i, j))))
          treeNodeShadow.parentNode.insertBefore(e, treeNodeShadow);
        else treeNode.parentNode.insertBefore(e, treeNode);
      }
    }
    this.treeNodeOnFocus = aN;
  };
  mxG.G.prototype.updateTree = function() {
    var ko;
    if (this.hasToSetTree) this.setTree();
    else {
      //let d=new Date().getTime();
      ko = Math.floor(this.cN.jTree / this.treeN);
      // this.removeAllTreeBlocks();
      this.addVisibleTreeBlocksOnly(ko);
      this.updateTreeEmphasis();
    }
    this.afterDrawTree();
    if (this.gBox) this.disableTree();
    else this.enableTree();
  };
  mxG.G.prototype.initTree = function() {
    var k = this.k;
    this.hasToSetTree = 1;
    this.dT = this.scr.d; // tree stone d = goban stone d (in svg coordinates)
    this.ddT = this.dT * 1.5;
    this.td = this.getE("TreeDiv");
    this.tcd = this.getE("TreeContentDiv");
    this.td.addEventListener(
      "scroll",
      function(ev) {
        mxG.D[k].doScrollTree(ev);
      },
      false
    );
  };
  mxG.G.prototype.createTree = function() {
    var s = "",
      a = "";
    this.canTreeFocus = this.setA("canTreeFocus", 0, "bool");
    this.hideTreeNumbering = this.setA("hideTreeNumbering", 0, "bool");
    this.markCommentOnTree = this.setA("markCommentOnTree", 0, "bool");
    this.treeLabelOn = this.setA("treeLabelOn", 0, "bool");
    if (this.treeLabelOn) {
      s += '<div class="mxTreeLabelDiv" id="' + this.n + 'TreeLabelDiv">';
      s += this.local("Game tree");
      s += "</div>";
    }
    // add tabindex="0" to this div if it can be scrolled (for keyboard navigation)
    a = this.canTreeFocus ? ' tabindex="0"' : "";
    s += '<div class="mxTreeDiv" id="' + this.n + 'TreeDiv"' + a + ">";
    s += '<div class="mxTreeContentDiv" id="' + this.n + 'TreeContentDiv">';
    s += "</div>";
    s += "</div>";
    return s;
  };
}
mxG.K++;
mxG.B = [
  "Goban",
  "Navigation",
  "Variation",
  "Goto",
  ["Cut", "Option", "Pass", "Sgf"],
  "Comment",
  "Header",
  "Title",
  "Tree"
];
mxG.D[mxG.K] = new mxG.G(mxG.K, mxG.B);
mxG.D[mxG.K].theme = "Rfg";
mxG.D[mxG.K].config = "Tree";
mxG.D[mxG.K].style =
  '.mxRfgTheme{--gobanMaxWidth:30em;text-align:left;}.mxRfgTheme div::-moz-focus-inner,.mxRfgTheme button::-moz-focus-inner,.mxRfgTheme input[type=text]::-moz-focus-inner,.mxRfgTheme a::-moz-focus-inner{padding:0;border:0;}.mxRfgTheme div:focus,.mxRfgTheme button:focus,.mxRfgTheme input[type=text]:focus,.mxRfgTheme a:focus{outline:none;}.mxRfgTheme button,.mxRfgTheme input[type=button],.mxRfgTheme textarea{-webkit-appearance:none;-moz-appearance:none;}.mxRfgTheme text{cursor:default;}.mxRfgTheme button{cursor:pointer;}.mxRfgTheme input[type=text][disabled],.mxRfgTheme button[disabled]{cursor:default;}.mxRfgTheme{max-width:var(--gobanMaxWidth);margin:0 auto;}.mxRfgTheme h1{font-size:1em;font-weight:bold;margin:0 0 0.125em 0;}.mxRfgTheme .mxHeaderDiv h1{color:#d63641;}.mxRfgTheme .mxInnerGobanDiv{-webkit-tap-highlight-color:rgba(0,0,0,0);user-select:none;margin:0 auto;position:relative;}.mxRfgTheme.mxIn3d .mxInnerGobanDiv{box-shadow:0 0.1rem 0.1rem rgba(0,0,0,0.1);}.mxRfgTheme.mxIn3d .mxInnerGobanDiv[data-maxigos-disabled]{box-shadow:none;}.mxRfgTheme .mxGobanDiv svg{display:block;width:100%;height:100%;pointer-events:none;background-image:url(data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4gxYSUNDX1BST0ZJTEUAAQEAAAxITGlubwIQAABtbnRyUkdCIFhZWiAHzgACAAkABgAxAABhY3NwTVNGVAAAAABJRUMgc1JHQgAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLUhQICAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFjcHJ0AAABUAAAADNkZXNjAAABhAAAAGx3dHB0AAAB8AAAABRia3B0AAACBAAAABRyWFlaAAACGAAAABRnWFlaAAACLAAAABRiWFlaAAACQAAAABRkbW5kAAACVAAAAHBkbWRkAAACxAAAAIh2dWVkAAADTAAAAIZ2aWV3AAAD1AAAACRsdW1pAAAD+AAAABRtZWFzAAAEDAAAACR0ZWNoAAAEMAAAAAxyVFJDAAAEPAAACAxnVFJDAAAEPAAACAxiVFJDAAAEPAAACAx0ZXh0AAAAAENvcHlyaWdodCAoYykgMTk5OCBIZXdsZXR0LVBhY2thcmQgQ29tcGFueQAAZGVzYwAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAABJzUkdCIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFlaIAAAAAAAAPNRAAEAAAABFsxYWVogAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z2Rlc2MAAAAAAAAAFklFQyBodHRwOi8vd3d3LmllYy5jaAAAAAAAAAAAAAAAFklFQyBodHRwOi8vd3d3LmllYy5jaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABkZXNjAAAAAAAAAC5JRUMgNjE5NjYtMi4xIERlZmF1bHQgUkdCIGNvbG91ciBzcGFjZSAtIHNSR0IAAAAAAAAAAAAAAC5JRUMgNjE5NjYtMi4xIERlZmF1bHQgUkdCIGNvbG91ciBzcGFjZSAtIHNSR0IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAsUmVmZXJlbmNlIFZpZXdpbmcgQ29uZGl0aW9uIGluIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvbmRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHZpZXcAAAAAABOk/gAUXy4AEM8UAAPtzAAEEwsAA1yeAAAAAVhZWiAAAAAAAEwJVgBQAAAAVx/nbWVhcwAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAo8AAAACc2lnIAAAAABDUlQgY3VydgAAAAAAAAQAAAAABQAKAA8AFAAZAB4AIwAoAC0AMgA3ADsAQABFAEoATwBUAFkAXgBjAGgAbQByAHcAfACBAIYAiwCQAJUAmgCfAKQAqQCuALIAtwC8AMEAxgDLANAA1QDbAOAA5QDrAPAA9gD7AQEBBwENARMBGQEfASUBKwEyATgBPgFFAUwBUgFZAWABZwFuAXUBfAGDAYsBkgGaAaEBqQGxAbkBwQHJAdEB2QHhAekB8gH6AgMCDAIUAh0CJgIvAjgCQQJLAlQCXQJnAnECegKEAo4CmAKiAqwCtgLBAssC1QLgAusC9QMAAwsDFgMhAy0DOANDA08DWgNmA3IDfgOKA5YDogOuA7oDxwPTA+AD7AP5BAYEEwQgBC0EOwRIBFUEYwRxBH4EjASaBKgEtgTEBNME4QTwBP4FDQUcBSsFOgVJBVgFZwV3BYYFlgWmBbUFxQXVBeUF9gYGBhYGJwY3BkgGWQZqBnsGjAadBq8GwAbRBuMG9QcHBxkHKwc9B08HYQd0B4YHmQesB78H0gflB/gICwgfCDIIRghaCG4IggiWCKoIvgjSCOcI+wkQCSUJOglPCWQJeQmPCaQJugnPCeUJ+woRCicKPQpUCmoKgQqYCq4KxQrcCvMLCwsiCzkLUQtpC4ALmAuwC8gL4Qv5DBIMKgxDDFwMdQyODKcMwAzZDPMNDQ0mDUANWg10DY4NqQ3DDd4N+A4TDi4OSQ5kDn8Omw62DtIO7g8JDyUPQQ9eD3oPlg+zD88P7BAJECYQQxBhEH4QmxC5ENcQ9RETETERTxFtEYwRqhHJEegSBxImEkUSZBKEEqMSwxLjEwMTIxNDE2MTgxOkE8UT5RQGFCcUSRRqFIsUrRTOFPAVEhU0FVYVeBWbFb0V4BYDFiYWSRZsFo8WshbWFvoXHRdBF2UXiReuF9IX9xgbGEAYZRiKGK8Y1Rj6GSAZRRlrGZEZtxndGgQaKhpRGncanhrFGuwbFBs7G2MbihuyG9ocAhwqHFIcexyjHMwc9R0eHUcdcB2ZHcMd7B4WHkAeah6UHr4e6R8THz4faR+UH78f6iAVIEEgbCCYIMQg8CEcIUghdSGhIc4h+yInIlUigiKvIt0jCiM4I2YjlCPCI/AkHyRNJHwkqyTaJQklOCVoJZclxyX3JicmVyaHJrcm6CcYJ0kneierJ9woDSg/KHEooijUKQYpOClrKZ0p0CoCKjUqaCqbKs8rAis2K2krnSvRLAUsOSxuLKIs1y0MLUEtdi2rLeEuFi5MLoIuty7uLyQvWi+RL8cv/jA1MGwwpDDbMRIxSjGCMbox8jIqMmMymzLUMw0zRjN/M7gz8TQrNGU0njTYNRM1TTWHNcI1/TY3NnI2rjbpNyQ3YDecN9c4FDhQOIw4yDkFOUI5fzm8Ofk6Njp0OrI67zstO2s7qjvoPCc8ZTykPOM9Ij1hPaE94D4gPmA+oD7gPyE/YT+iP+JAI0BkQKZA50EpQWpBrEHuQjBCckK1QvdDOkN9Q8BEA0RHRIpEzkUSRVVFmkXeRiJGZ0arRvBHNUd7R8BIBUhLSJFI10kdSWNJqUnwSjdKfUrESwxLU0uaS+JMKkxyTLpNAk1KTZNN3E4lTm5Ot08AT0lPk0/dUCdQcVC7UQZRUFGbUeZSMVJ8UsdTE1NfU6pT9lRCVI9U21UoVXVVwlYPVlxWqVb3V0RXklfgWC9YfVjLWRpZaVm4WgdaVlqmWvVbRVuVW+VcNVyGXNZdJ114XcleGl5sXr1fD19hX7NgBWBXYKpg/GFPYaJh9WJJYpxi8GNDY5dj62RAZJRk6WU9ZZJl52Y9ZpJm6Gc9Z5Nn6Wg/aJZo7GlDaZpp8WpIap9q92tPa6dr/2xXbK9tCG1gbbluEm5rbsRvHm94b9FwK3CGcOBxOnGVcfByS3KmcwFzXXO4dBR0cHTMdSh1hXXhdj52m3b4d1Z3s3gReG54zHkqeYl553pGeqV7BHtje8J8IXyBfOF9QX2hfgF+Yn7CfyN/hH/lgEeAqIEKgWuBzYIwgpKC9INXg7qEHYSAhOOFR4Wrhg6GcobXhzuHn4gEiGmIzokziZmJ/opkisqLMIuWi/yMY4zKjTGNmI3/jmaOzo82j56QBpBukNaRP5GokhGSepLjk02TtpQglIqU9JVflcmWNJaflwqXdZfgmEyYuJkkmZCZ/JpomtWbQpuvnByciZz3nWSd0p5Anq6fHZ+Ln/qgaaDYoUehtqImopajBqN2o+akVqTHpTilqaYapoum/adup+CoUqjEqTepqaocqo+rAqt1q+msXKzQrUStuK4trqGvFq+LsACwdbDqsWCx1rJLssKzOLOutCW0nLUTtYq2AbZ5tvC3aLfguFm40blKucK6O7q1uy67p7whvJu9Fb2Pvgq+hL7/v3q/9cBwwOzBZ8Hjwl/C28NYw9TEUcTOxUvFyMZGxsPHQce/yD3IvMk6ybnKOMq3yzbLtsw1zLXNNc21zjbOts83z7jQOdC60TzRvtI/0sHTRNPG1EnUy9VO1dHWVdbY11zX4Nhk2OjZbNnx2nba+9uA3AXcit0Q3ZbeHN6i3ynfr+A24L3hROHM4lPi2+Nj4+vkc+T85YTmDeaW5x/nqegy6LzpRunQ6lvq5etw6/vshu0R7ZzuKO6070DvzPBY8OXxcvH/8ozzGfOn9DT0wvVQ9d72bfb794r4Gfio+Tj5x/pX+uf7d/wH/Jj9Kf26/kv+3P9t////2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAHLAakDAREAAhEBAxEB/8QAGwAAAwEBAQEBAAAAAAAAAAAAAQIDAAQFBgf/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBv/aAAwDAQACEAMQAAAB/cvM+g2pVGQaMaDYzOA02ssSzqM0R7nKIAaMaghBCrhqWBLrBKqooy2q6RyoiDa07Es2TcWqpBbstpRhGp5PqdQmdX1zpYDBrDsADT6yyTzuM0yNZoVVlazQaEbUyrkFawCymwS4jnWUI+kMqIqlaazPNRrlmq2QW6V1hhMg0NTrzJtdOsswa0CmhtTAHZOiZ1LGtoUIosroKMLTUYnKB7ElnnVtYRcRzoGHJwbJt0YpomSLxTqyKtrKs5Aqi6nZlNrr1yoi1oFrstWZE29wdSXPc7pkwQCSsiq1iq0hsnNYeyM1PNvrK5HTnzoNOywggJp7iiKoOF2Mire5sxibSoq9MtLjo1mmokYw1jABFNZEJnU7pkxgCSvYsrWTlrcqqSqtEhmxm+vfMZYhNI1Vk1kkpGKMo0pxzpNXTpuKsqTaKS1rpxL3NtZNaNQGDZhSrIEaTNNGxc0WrDIq4Ba5nLNrZlNTmz0lNde+QyCwmjY8jWMc7Rh7CiKF55uLRTpubsSXAWUXa6LiustYYAqvqOwudLbS4Arc81jIikXNOpjCltSeLKVtGTlx0U67zxOWTZucUAkm9FGNQFlhd882zN7LuatZJNYvL0Xm+o9mhVw9y9ymdrToYW3lxquo1i4orUTCmh7FWOduyycuej2WuM1HIXQrRS4jN4ZnKbnSg524TT2VsuzkUg0S8vVcZLazqSXFLDYIRaM60RCbwyLk+i5BrGZOhpYljb3JISsrMm2M0BmVadiDo6PYGXIttM886ct113AjquAqpFoHTL1XmdHQ0kK1a820XNnLS5IKnnSBFzptZGWXIq7SlzObnmsyxKVkwy880trphmUaxgs0qUERrjdLsaulzVrJztaXtZtcsPrIUAypuPMLdTmqazoVRLPNKKpRWihEg7jpPO5w9jRJWANXPnYpkVXZygWKXL2SmiitcjdZk1djVNqSunYzfUTK+8qTmyy6PqYjndrgKkBZZtEkrgXMlZtOy+szzqSuhJZ2bnDVz53qwCjNGZtqOyRFKK1FcY6GCkbqTRT0JmlmK7ysqZ0Cu8UYVqM3ZgKqqSzXEadhVZM1OH3lhM6mNJiU2U1rsc86YBg2dLHPN4awxOnIzUraoi9V5JLO6nEmvWvNkYrvKSpm5a6w1iTSl3OTeVMpytSjKJHtVmbVNZYjjQDQhJpVax2eWbexJcPZRlGhLTXNZpGnSUslozNrsvOV0izkjN+zeRqiNqJmqBbaw1k5oFblJopx462uAqw9ALIlFEKTVZWUIs1NaXDHNN4yhHsYSDbRgSyaNiyorpJey85NTtnKp7F5KtmTomahiusvZKawyZccmOlbjQrTXOMukFoR0jNkLKqJqS0Slzzzc1KYJgmS1zOawKlNBKEzpuEWTU5VPY1yFPB1BmpC221l7Ofnqlh02W0hjT3OVINukIBlmPZKXLgoJUUJSznmwFAroqlGpplLWkexJZtoYvcTakqLKX3tcVCPqJmzlBa5fUlnTJlKKs5rMvUpSZWuUggteSLRMBTMybxW5hNIpMhRlmUR7EgLe4lNgmqL03nKWV2pGX6DXGZVBpPNSayWuX1I56U1gZEVZS4pZKaa50EAq6mSU2UJOLMxbBa45p0mrZztXJVJNOjszaydFyks1RpTouOduarEWvf1xUdDqTzZzQXo3zayPPVLMraiZ1KChpJWs0YwGlQkmjI1gmgRmqWXuOWbRSZMUSSsPYsgUlGZNIuOi4hLG7SVD3LxNOHUlmzmgvTvmyc+NvYyNYks5QrIitY0LbpA0gRJWoGiKrLWy1xyzaK7OXIVRSzWxZUVkCgRWS9xJeebRZL7d40sI+pHGkAdO85J50R9QomdTgKbEmnuWhFAUS6eZm04DSSbBRHueWbRWQmKXPPNujoaTIWgAq7Lo1znbyuhk57r3nE1orvM82M2qde8Mkc6dMrJJoIVSAroUFYEqjIrRFkNSmlWrD1y52q6mTDJBqqFMTUlmJNxUL13lOa5W1Jr7jmblGujeJ5JLNrs3zwmdNrK5uAYAkqNUZexZTZoirgCAyymki1jXPPNqBcgWzEW2ZelhB1dOdpRF6bgRBqSg9m4LJHsUnNKdW8MiZraiY01kZprAJNZHpmcLLhGigrRjCTUZq1zS5hNoLKbAUZRQr2aWYyMQaAi9LmrUli0LPZYAWb2TiU3rL3FNRM06LmlJTb3KQreSthZSaNghGsZMaA0CSulbmE0ioOKVQECyPZKbKJlPWgqHUzMRYNMnq3AUpe4ESbCWuaai5BSmWU01iQjRKsNYFSUotCXGXJKadEUlbnnm1JrRAjmqUrpRmDbEGsgWa9LmFnbKayetec5q1j3BiDeS9y6YVSFJymklnNMldZdJzShRRVylFmgKqoxdjnbBJpo1zQUVQUSMrnPNMk9VV6GFVSTTJ7F5Rm2S2sCWDeZvcuFJyvWEVRo52yze5dEaUMi2iFVknNlJrLN6dZpcwmgSaoirRnVOXIxJpmeKdOm5i1kuyios1ZPYuElQ69c1iDQmr3D3LaJmuiKirBJTT1S4ok5QYRcBTJJoGXlzrt1h7iE6BJNOhSlyIm3kYmOvK1dnmbB1sTWZJVX2nNbWS9wpGbRem8yj6Tzp2QSm4TVrhGmZoj2JKikVAuMs5ZtAlL13D3MJsE5aWBei84y5ZFkk07OWTUGgd94882iyWS+1eeGLXAOeaE1065smElewKpzZ3a5nNNZRGRVWiiSgYxOaRUVkdl0k3JcMhL3nKbNkZqiIVueSdGINMnWxJYrNZr7bmLWS9whCaB0XLBRJWrIqiFVFKUoya1ZDbGCZdAtlKxRlFayc1FWZysnRcRmikm6MQm7Wea6drHM2U7GItTJKq+5eMZu1w1irOaBe4KsykpDU5ZtUZRSr3Ok1BSkJsppWsRUlBVEWlzOWLRQmOi81Em5LW5jNOnG6dLHO0DrYk0hNZy+5rnKS+oIArSpa5cbUTNA6TXnnS1yspRkAVFjJCbZkNZAs4WatcotWUWDRGTFrzxNtIaxIK87bJNVOlmSgkuPYuEg2uxgXSRa4dX1iedaGsSakNamaaaQ1kA9kJoSmzCyos1siFUUmqyminReeIzWU2JKFQVVWK2ZItJLNfbvHCN0YNLLMtc0RtSedhGXJOUCNFHQKUABQNAKJNKItmUWiSUiGMl7Myk2o1yk1iOdPoE5W7slFVSF177ijU1sw1k5ZN2Yex9RMXGookqrKV6dAAzTMSaWaNhRZpBSqIrpNcIrImbXeaTM2lSliSq1DOr6zFYtdLCqCZJr39cJzaL0XmCU2pVglNwZqiysgJqjRhrkqqBqrEWlVkyrKgUok2mSS5QMiJ1XCSo0q0YVpCDd2JNRa7HOSqqE7fdvGc2DouJk5sJW5YbUGU5XpFEoJSsNYyKBoCmCYWJtOjIiuk1TNGjpNem8wCFawALzZ10azOWK9lxFVtmaX1LgKU6rzhNK1ke5or6wmbOaNgVYyylewjIgSlkZtJaXGJTaDEyyMkmpZr6hRWui8wqyK07M2lWOdNqTVTtc4XSSqLb6Ez2a5xm73EpRQzqmsMPrKZuVYxJpiLVGRK9yBWq3EppVdk1LO0UJiiMkWkUhRVsybnQtrSSaRcSaqzztdjEF1Tli17d5Mk2uq84NCAUrJVJS0sxGbCAlN0sUomRWrXHPnSNUuCqLOUFEw1kpoEldCVYNYBiE2AimItdrlyOj2JLDOvc3xVqa2YxhGizSx0lNvcFZTSorSwaEVuQLNV1mcTaYe5SVJrFbiM24gqpk9msdGsEYS6nKDKDHO1VlkAlsJr27zKFEaozqjnT3Nae5lmkFaASm0UoC1gQNCDcrNGtCiK6GklZJqqoUZRastYs1qEkW3Sauiiqq1ZSpyxt9hh0C0sZlSc2WaDXOJTTWCUCiKJrJWwIGmZUVoshVmlMYdAiNAVSir0OaNAwzPO6OklVaJJaoUUlbCa9m4pcaadlrFElI9jJtJY0UVUaIElNPY6KoND3KNAoyk0iqBHUpNcYwi9V5JKFVWueedGScs7ehIq6UYnbOa53T2bxqyGnuWQCSlMU3CSxpaKTmxCLRFRlWy7Mmyyk1qZkTU1UyMpRFUYADpuEEmjWZjNhUJr0XMZqzJRbVSE36tw4hZHuVVUEuK3OElRVaAEszzzoAjJS5dJLGbJW5lKqqFGUpJcMAB03CrKVrCkJ0QIi0Zi1dkmuZrFv1GGGZrZjKiBRFrnE1IkuVFtcc82ARW5I9kJtZSlLmM0URcFSklYKYUvYiiMPcck6gIma+oh0XKrmUamvqXnlnNdF5sbUXNRozNtwCZoia4IUm2E0tLMlLmU1NrFmIzYRGiEyRmqWFAqpSlGZVp2eadFHSaukGuu4ktUQg16jLXImnuX1k5ARcU1CJmzCaFaLKNqhV2CoAk5s1ViTYk52yUQpNXAgVVrcgLKtUZ55uS0RFdINWsdnIq8zXtXmIxSxtTCiZrD3OtTNUdJqk1kyqFHRVxgVpbXEJtIRomGsSXGAitOy9zhGqsQdIS9DMlYg1e5dlbUiLXrOZBVUfWVXE83FdTUITNfUlirbpcirkdAqjWJNlmu8xxqM3gmDcrNAwAK6VvMLJqrEJ0i1dlQ2QaulGEaRIN+tebIVbWXRFImaCmpgC5tNSObOaZGsnN4pcLCN2uJxmq7xLGoTaFrElexQCSuIOVvNFk1VlGoTWpkYmtmSLYsQu/VnNrCPqMiNFFzQPrLAEzaakc6Sa1jpGaK0uMAfUTNSW+8yzY50jVE1EWFUUZAVuTYksm6sTanLBq9yRUvchUl1RmvUvN0w2o1mjUJZ51TWCKoae4hjSStTk5cj2AfUVRmoU1ExUahLe4RcrEgKQHQ5qqk2nZkqzUWrXODVWcihiV13s1Z2qzL0AQqjJtTLkwa5+eguqhOCj0o+oublSRrBKixm3sVShZm3oxrOq84zWqE1VmLosjk7WQ1RiiIYk1//EACYQAAEEAQUAAwEBAQEBAAAAAAEAAjEyQQMQESFCEiIzQyATIzD/2gAIAQEAAQUCcmrGRfc7lYWWrKxsZRvtkIp0lCF6H6CAiny5adSvTk9Gzk1CMLB2cmwEP/gdxDZ2MLJlewhsEU5Erysi4qIK1ByzwyDHp6fLp4Qs1CywVyiemwEIWf8AZQhts5KKyVkXCGzUU/Z0LDL89ZTx9Pl8maaMenpydIqLNhsrGU5CiEFZ/wBYMBQ7O+c+hOFkSVqIHs7eWdk1MrzpVYnR6Oz564CaPqwbGM8IlDY7ZQj/ABh0IoyjtnIkdae2W7as89nY1YU6plSxnTxL4NlnUqEKqG7GUaZE7ZWNwsHY7ZO2dm96e7VnVtnyEYFHQbJp5bD/AE6PZ7Ql3YbDe24OxWUe2i3r/AQWEFgon4owUZKyNxARqmbalisJy/lqST2mn7Pnv/o4r0UU6rYb0HIzgpy5K8iRKCwueEFjLYwVqnoUKKPO2EatXkrDICMlCqfEaJubZ54dqwe9R8eysc/UJsGcI2XaHb2y3soLG+PTUduO2xgyVkQnUg+XLy2BHooUw5H8zYynrU+zPRjJKCP5lejJWfS5WimplsYMZ2K9NR2ECfJtthatSfs5FCGVbVsugUWpHn3LsOHR/IJ1UUF40e3he/QnOO1pdaQhu2DGVgoof49+DP8Ah/aNjsIbQQJdAotVY4+2cP6Z/NqdUympkaIIQTbhNnnrYlQBVeShKKKwNyveIWdhKI7M5wwfUQwp0Ci1ivQkbPH0bRsOgpyEDoOd8i2rUOmNnGFwOZDKlYOwWCvIkQsA8uFcoxkbZ2ECojTTobQrWXpstXPeNNNh0GTCMP6BhqwCsYQsa6cORh0IbO2zhE9DporlYOxj1sIC8sh5QrjVQu2WLLDy5thG2SjB7d501gV84QH11IbLk6CsiSnLKwueU+EZzjJque0UEI8th8NotaP6NlqyOtY/XVKyhLqGo6BH1ZDl487CdSrUU5O2Gzl73+P2cEZ9bGTCBRh0IR5EPhtFrR6bLdn9O1P0d27YXf8An1wKuWmEV4NQuUJdLU6HQdgijYXwsGpRnKyU7ZqMOhCr6hPWnQnrVj0E3bWH01Dy112rDb54AUud21qK8eV8isOkJ0Phyy2TJnT7XlGq55aZyslOWOenI7eXVanLTqtVCwqLJ0ToyRAWXBOa/jj4hyEFeTXbLoFn1fBWRJky3puDAQjj6On0hJ2M4KMCMOgdB3YYsa0evPoLLKYEDZp+TSdndpsFChqudjDbPh8GchGxRrl0ISKFZCFijPoVcnILBTz9dNNla0evHobNkVxjlM+qdw5Ht/lqK8+dhUy2XJ0FZajJRn06Fx9mwYyhJRtlFOgLBl36OsLrWjPkXEOX9BXbjofZgPTZdT05Y8mOE38jZsmXUMmWoyY9mzow6zbY2Eo2CwdsYNvbuiLrWjIq2wTpM42BTT8XP+p01LAfs5BednxlhTk78ystRkoWFyvLpFsHYTkyF5MlYKNm2em3K1YzgSifrqR6aisvs4fNruGNQPZq2fOE6xsypg0dCajJQuChAr6NzBkITk2CwUds+mp6FytVEffyLCEatTNsuoI1KlN7d5bbC5Rt6YevPl0FMRRQkdjHj065QlBZNgvJ3yLNjUgWxqo28tkRlNhqMmXVWpDpB4Xps5wvZTIMeXVWn/jCFRJ/Q7hZyFhFBGVh9WbavSdby2wTrG0BOHbpPbfknS6ze0JCNhCbcw1GBBqtNFGcCpjHr0ZyNvSzsVk2wE5N21U6+GyiisieUVgHo/obNPQTZNguFp0d2zj7CgXP1EMRWfODGPQkrLUFkLBQjZ1hIPTk1Y1JP6YbPKI+3P1jUEO2bELT7cUKNsJJ+w2I+OmemkqGiRURpwVkVw6E1CzllCEEK5whLkD9oTj03Z9jfDZTohOP2CKJQlrkzrS8iunGTcStSHy6XVFvONOEJwnwVyAvZXoThQsHcJ6y/oukWMOubmBKKae3j6ifOTD9LnUeevHnTH1EvH2z8k8p/wCjRzquhs+cacLPlOWH2FkZRQqa+nQdgjtqLTHy1PeHfoT9ihuE5CF6/kU6H/m4LoIS6cp6d+jLuhqFcMhZ8lORR7AnOzlgr0Y2CcjDml7GafwcLmD+h6KECRRFNQRWp0wP/wDZ0P8AzN/LZM54Won3b+j5ahUQyP8ADk5AfQSZEp2x2MHYJ0mGJ0Nkr+pjIjOnt5EhendvB4c+HUy6gk2ynpyYP/R1mQ2i042MFORh2p8XDorIRXrKNTsE6cacOKbJXvyJxlp+rulCM5y63HLT3pmg7D4FjY25TIfVt5TaCuNNZCwYKMag7RlBZydnVdOz9mIwxFCRAkRkJ3azmQZegmow1OP2EusZ4Qu+vy+JHTW0EY0llORg7HsBOkILKKMmHbv2YsMRg9BNXn01DbIhaiaEenFCAfk5susbLnt0jsmG0ELTXpORpjLatgygshG3y7KKwnoQ2EyDGpU2ahXaQ+dhL4aVqVdOGw1Os6/KLeieU27qirVjTXsJyEeSh01sGcCPWXRko7vRo3ZiKf2/01CqhwT0alCz4CMGpsExOu+6C9Nu6GwxY00JwU1CCvLYXkbenV2xkVenfm2MNRR/YQIbXyLN6Tx1jy2XISE7ou2anWNuEE67LlMqNtNCcegnbeRC4+oWCj21h+yMZFXy+sNaQ4CxRsKIVwsvTV5ajDZHS1EbYbZ1iuU53xLfstOybEOM6aEoy6cI0RkoIwU2eOzD49BPT0/89Ho+06Hfk7f0JKZATZQlxRPzd7Xt0lcrWaVqRpbNk2M6UeginDlBYzsZaseZAdynRqV9CXp939kdah61FqV1Bwno7BZKA201hre9aNNvGi2xRs8J0K7CeWsPxRgXy9aUCWz5BRnwLHYpqwKiQnQ6OfsJN5d7cOnbPH2/oalGBJl2zkxFajvivl8wPzbMh8uh1fktMdeHNK0nfJOlyctKMiTULnvwJcslBBNiNnIIRk3bLVwhQy79G38GU3Z1U6rei5Ht7B9/XnTf3qBSDVM7XkSenPWHRprIRqNuOWgfEOWShsxAIS6zUypXK54aOgx3yGUbst4WDBjUTTyHRyjJu2/oJ7UTyGwY5TOtQoH7J3bfLo09yseueE53IesmwQTejDjDpahLquhPQKdbBu2fCwYlj+02rtsn9Ofi82542A+reljlD9Cm2g+QPq6NOAsehHpWcuuXkOcJXrUBQcHB0noanTnQ5enW45HlG7ZKGxq2qanRt/R6NswmoIjpC5WnYrzh0MhsYzmXEfMUUJo+RdwEJyZHY+PbrSJ0/L5bLrBfzRuisFGvnzl8CYTY1Kut6KZOTsP0yzlShGCmJsDb05Od8UOz6a3hO7cj0n9II7QW2bUpiyEarUnJ2ARqKOoU+G9E0CenH7Q7nlM6OTtLzOkjYIbCrYQQtkIzx1zu6H9hqyfzcvTavTZEbCNWOPsUEEaRpmrk9d/F3ZT4dZl3jhCfRXCFzIJC5+TROSsN39Os7p381hYK8sj1sFh6wXBqHBQlsaseys4NHdabkU+DDuiEU6QeED8gnS5cr+hnTQlQTGG3Gxu+72/MPhGFg1FGQ88Of1qZEirrY1B/0exvwQsFq19GDJRpqfm7tOWpBq+zU/ouQXHD06Dt7cmdIWRnDqi4he3WT0EYO2G1007tOPLHWCw5Z01qLK1R0JwZya6lHJyfB7Tu3t6Twn2aOzZGu39XIT6RRg1F0V6dZPnBg7CrYYjYfm9ZTkT2Oge2SFq9hqw5GfGqnS+NSAO29lq1ek+3kwjUQnXTJM7FGvrb0bYdOx2bVsNgc/MIwJy6x7Tj2IFMvqEaunMp1nJ61ICYtN3J1oMtlwQqYwnDsyxHYyVj1lesmDI/wIbAqW8Myhs60IMBQHCCEakNRq6csTrmXrU2Z0NPj/trVKCKEPrhORlm+SjHrbJ2cm/4ENqKvjG2XLhE/aV6CdVsYdOWJ18lPWDRzfqT8mc/VslYI+vHXxX8zZiyslFZznJRh8CENhDath8trtkyhbzlqNW1Kzln5uvkpydV0mGfn4EvqZcsL//EACoRAAICAwACAQIHAAMBAAAAAAABEEERITECUWEg8HGBkaHB0eESMrFC/9oACAEDAQE/AUNFlFCh/TYuGdR8RcqFyaHCehFxX5j4OUIfX+B/UIRQhjGItSmNbHPuGKGL6GKEIooaOIehwxCEi4ocP+48Xh4OvQ1/5FCE9CMjGOPQoS2PsWoqH9HqFD4Y0KEUIofFDhx4wulQ9Iwf7CezGGP+xd/IoQoYxji/oa3DexFfQvoQx8KhDKih+i/zmkI8UNCix60L+RPR/ounl0YihdPYjA/Q3sfqF2UhuyxRUP6bEOE4UYhj7LHULke4XRrYu/mKF0fsZ40LkY0ePRpKesqKhdRgqah/QyxQhGNChxjY9OLPQyjx4UccLY+4F7FyGt5MZR1C6Lghih62WKFKWx8K+lxcOEJZFC4IbHLscYHC5FwkXg8eZ/ES1k/0a1kRSEjGhCdiH0fRexchCNFj4VDLhqaPYuiPFFiELCizhY7H0UMsXItwj/6K/UowfAti4LGShHsxsfR9KhCniHwelDL+mh2KM6wMuEVK6Zz2FDG9lQ+whdyyvyKGL2LuIXUfAkMsXtmRChDjydDHNzYofWKWXCi48UJCl9GMXRrceJrL+6K/I4h/f7iYtMYtRYy8jylgZRUVGB78hj9FxZUoXof0VksRUeyhaKQofR9GUhdH2Ej2Z0V+h9/+i2zOx+hPYm4fofRvI2PSGM9HYSOj7F/RYjjHCEUWYKmoTKKM7G8sfRosfY8dlNj0hwm8j6Pov5FDHhvAlQx+h7Y4uE8LJw8hL6KhIY+fRjCHKKmpY+ljh9EJHv7sY0Y0c2eQxYz9CxYt9PkZY0Y3L4Lp5WIsUMsSm4SMjFyLlMqEM2WMSLZZ4lMbHDWsj4ejMbEIrMMRaLnO/wADx6MQhQ2WxFHoZ+JjGxdj5mhHoxqFrEWyxiHHiVkY4az4nUI1iHwS2I7oT3kfRD6i5fwLoxCPZQ0IRX0N6wJihnuFDTi1D6yx9EPseJTGMx9/oJC4LkcY3oT2WP2I8nYi0IZsfoTGhC6L6FwfDAmLYihGI9iFD1lCF2VCH0Syzx6V+Z/Y48Xs8e4FzI7h8KMuziw7F0aFosxuMFi5gYuiEofBC0eXouEoxhiKlCH0/sW54xdGI8uwkf2f2Pai0zjOKcaE/Ymsmc7F7GJxY4oQ+CF2KGKHtlsQ2WZ2KMj4IQlo/sQux1wxa0MR49KjsvTLwWOGsMS9QhiH1fkL6F7HC3FHoQhLYuC7HyPokUMYhci/zEL+Is9iVnkUhHj0qODcPZbLjA1nYtGNHRsX0tbFwYqFFDhMXsXBRkfRdGMqFz6ENi6L2LSEx8PwPGXyFgxr8B7cWN7yPuBoa0WdQrlR/wDRQ1C7gRQyhFC4IsXBlxgcI9FoX0IfELaKjx6P+SxrQ/v9xM9l5jI0NZWRb0eRY1oUXGhe2UNCF09wyhD4UJH9nsfC5YhcGWLkoQ1hCG48Yv8AUfD7/wDSxbKQxGbF6Fpi30fsaEuD4ZLhcFtDELohDl8GixnBcLKhwuDZYvpYio8RMv8AUfB/f7nBDscro+nj0Wxs5wcWYKKPJHS1LhDGyzGyhchwyhcH6hKfgY+iHyPHYi/1HwcZH0YuFT4i4PcMpS+CoYi0LseWhChyxPQpcUOeDEMsQ/UeJSMb/UfBi9ehblMXBPeYQhj4MXBw+YLQ/wCRDE48hULhjZYp+CihjKEb6dPcqUOPEXC/1HCEYHwwItDWGLhQ1uKFxDh9FpmR9GYw4YnHwWWWYHwUMuc7Ee4YuD5kahmTxKUOM4RjZnKyWxCG9nUP0IfR8GY1KeXktiLyMuPIUPpYofoZ9/tDLhj7FwxGNGxIdwhcLHyF0yJawMR7hoe3+A+j6N70MQ3qEti9lCHFnl2bhe4SyUI+Bx6OjQkY+/zhihZwL2UyxcEcHHyNawJ7GXC7gXloSOstjY2J6KRgSFxjetCGtDeyzy+j2JwuDihiGIpi6KVHiN4RRYnoS0hHqMwj+49mswkLonZkYilCFwfBDixrcUWz2I9iYxSoQ+CP9HsYixNJj8sqEti4KGh8+/gemfjDv8hiFttjWsiexdMF4KYpQuD4IcvpUI9iEN7wOHCj3Fi3+8oQ4fIoUWo8vcWP+CyhaRjWDxF0pi6MRSMi0Luht4FwfR9jyjghCEJZWWOKhFFM9i7DhFjWxD5FForHwMoa3gR8iihcM4ZbF0esi3sfBCZofciHweh9H2PIoYhdELp4tQoYp+RdEOFDEOGPv5DGUP2fBjQpXr5h+xdPYkPguFGSsi6YyhljMnlKEKF2EP6EIXf1FKLGWMQtmbGModocU5SGxcEMxhDFxCjGsCdjzgWx9nyKLi4zoehihwxGMLJ/ov4lDH2GI8SmMcrTwLaPZ6GKho8WLh8jex0LhRhC1sSofMiH0ZYyhrYh6ZyG23kfXLYihdKhfxKF0cMSFpMoY+xlDEo9QosWtiXsYxcQjAzOh8EPoxnkVCYz5Fr9iy4fZoS2NYP9L/KH0QujhiF/1hjh8yPYnv8AQswPgqlcEMdC4KGUPgmPo48hxQ+CQv6lGdwtC9C0NWhbF38ih9EI6xrD2PghcwN7wfPyPv6ll/iULQyxlqOiFyHzIuChLQ3jQ+QzqjyjJQjGz/BLf0osZnQuiKGxehexdGyoW2LouS+R/o+jYz0PYkJYWWVFC4KPFoXTyOj4IofRjEJjdlz2GWZHpjWNi+/0F1FH3/4IXBex7WCo8ROxVLOi3PkIbEeTyx8EJCYo/wCr0JUNC6MoR5dHyLY0KGL2cENQ+j9jF/QqKhcycM6wL0xQuZKEIQ3rIuYFCGhCSfRppj0yi8CELpg8mWJo8lYuCEjyWyotwlotD5gUsYzsLRzA/wCT5hvQ9CY+lC4x8LKhoWyzn3+Ah7ELSHxDNWeS0I4Iwh6ihc2eMLp5SnsZwys5Zn0IoQ4Yx72IYz2JUYyPY1hlZihlxjcJUePsap/epoRSGxidC0xrcvghrMLRYjyj4E4oaEhOFwcPaOoQh7HzIu4LPkXsaKhcHH3+0J7OMWkPbyKMC4YymhGIb3ke4wUIY9nBvYjyH6LKH3JR8nOmzeBJpbHFHi1waaFR8C30Qiio+DIuDPZ9/tC0y4YoRQvQihTmHpCHDGIY1suGcE/+LOtNndjeBZe4qHoyV+ZjBxnwIoXIuFwaR7Pv9hCLPgzkQ4foQtoekL2MqMj4Uh45D7mEMfRxgWxJsfMKG8i0j4EIYkez2NWWxDFqLUIpCGZ2I6xd0f0IYujEJHUY9j5ODOhHkJj9whjmkZ0OM7GoyIWhlC7+Ivk+B9F9DGePTOvoti2xd/MVCZrItDELg+CfscJmhw0Y9jehij0OFwQllF4PksuFD6UZuHY1sTjGeD0PgzxKioxsW2IQui6hbGJi4NDTTycKEYZQhjjqLLHwcULjE2tihdNxY+jEsoTyhfwMb2VCf/FZG8j4M8emBH3/AOwusXRaFQuoXRDFtCjPuVFCHsfCxcLF0ofYoUKLmx9PIWhLDwKozvM+QvRWDB4j9F/rKPEQuiFrAuDExcHopwuz/wDLEx/IpstD4OFwXISLhbix9GUXkXorMJiR3YtM+I8dMf8AIuiYizx9iEjxooehniI+BLeDglGRcPQ+CYimIRU0KFyUYH0fR9KH7LlCEhllC6P+RdFwo4LmhCPHoxjWDxFpDExlqU9C4hiELgjOzJUUUWLk/MPo+j6J5YuHscLkNtDedjH6EeyxR5MXGevzEIwPo8/8cHiKEi2Ki4Qjy/mEJi+hHxK2X9FjH0R7hmhGRJJGMQ/Yujsv9BIo8vQuGcIX8CP8FtifsWmY3gfI6J7M7MllD/n6EIoqKEWLo/ossYuDhj4KHwsoZZbPv9iof/YXCj+hCFZY+llfkIR7Lj//xAAfEQACAgMBAQEBAQAAAAAAAAAAARBBESAxIVEwYXH/2gAIAQIBAT8BFFiHqpsx6L3w/ujH2H3RDGPWtkzk3C/JfTh8/DMJ3tcWIWj0+i0ZQno/p/Yv8KhRcVKnIuC7HHNxYuilDHDldyPk8M+C+w5Yo6LaoqL/AAoXpxy4sfYX0obljEOUxlxQoey28hQ9Ef7H9KKK1c2IqOsQhjhw34LkOH6hCHD5DYjPhU/3Vd2UZEZ8HDjOB61FaM8KUOeQvZZf4tRmEZ9i5UVChjGOHClCHyFDiobK0z7Ls64zC8Ej+aZlCZ/BFRnAioRUNmfIbHnW0UOE9KmouODhxn8vReuF6zORFTmOCHF5FL0o/wAh70ObEP38sbKEULaxUMyIUWMzLfwY5XBcLHrZ2H8lwjEXv6LxFTUXFSpYu+lFj0bGM6IXBQ3LOR/YfiK1QnNii9P5DUqGOF3SyjJerLlIU1DL0fChQ/w/2Fyahjfkpw3FinOStGIWqfmih6ZM/ooTl8F4Mcoz9Gz4WUZKH4VGd3NCGVDLFFi/BfixDKHChx/RS4/ghlzmVFSoetj/AFzLExlDEKH8hyl7kY9GOFFMcVDlwjMvRIqUxT2V9GIY2OEMYio/pQ3pnAxiFDihwxDHqxlx4LX+xzSsD7kQx8HCGWIo+GZZejZUOaKhi5DL0Z3TMewxT1aPghjHLLF4UUJRSGXo9qHD9FDH+VDf4ZP7CGPgyxDYzPgxwtmMs4PRjYhQ4r8V4MXsuUo9wPvohjGWIfRjLHyai4XsXL1sZcOK0vRStsxUIY+ZixejKLG/RlDFovBjFDUVDXpY+mPYcrT7KMDjs3Pg/kIY+ShjjI/TqhLRaVHJ64YoY5wJ+DWlj/CjMMQypQxiE4XCyypSHC9i5+FiHLitrl8mhYhRUXCKKlGR/BdF7N6/Rl72JjLUOM+aqHKnk49ldGIrRDj6LkUIx7okdhbKGKGXH+CHo/m60wLs9ioQ4yJ+TeiPperF0csUMuF3W/dVOdVC7CcqaKKi5QhKOiXg+lQoRUKHKlSxie39nBxS+YEVCGXGBn+QnKOH905CHojI+ytMxiWKO6+jmhSpx5DdRwuL1Xo9nC/kPp9j7KGf7+1iXo2IqEYh8KGoeinBj0ejh/RKbGP8a15D0sXShSn5GcQxxgXYsQ91NGMCiz7CipQhj1zGY9ixdHoi4fDgzJjw7Fw54Mc3ChD+aVC+QhQx6cMiHLhL0sXCoU4HDG8eCrRl6XLEKFFuLhiY/N86dnBWqhHBD4OXDjutD7L+wvIUfYuGhDmtVDOGBwuxnGqHDhjHr2GXq9FDMCFCqcy3OY6POi+jUULkoc58KLEvBDMSjpnVwoQxliFFDY9HODs/6ZMQ2XFCKEWJjELkqEKWf05oyhR9GNel7OOCPut6exgsfBcFCli3qWJzZUUKFutnteyGLgoR5mLEx7IqOi7PCh9HwwJ5FDc1+bH7PJbi4UMUdGPsIoa0ooQkOLEMY+C8l63GRfqxiMH8lFiPhgx+FQvRsY+wx9GLstj15spuH7ODo/RHYtDFChMcf4PWixaIsZYxw17o4uaFPdMaUUeiefBjGLkIfIcJbKXpYtblzUv1Rj5CnOqKlyuRfo14KF6YxrkUvsVGTMJzcVq/2vRooYjEOUP0cOV4z+Q+iQh+ofkOHFziHDhy9VpcLs9Qxcij/RR/Dr8jweG46WP6JlnB+DQ4euT5r8h+S9f8nBZwUULgxCj+y/ZwPC0RgfYoqX2KixGJo/ozj/Vd0ooYp+Q8jZm4XmqG9WLV7VL1zC1uEPz2Xp8LhFxw7DHNDihi0wPao+j/AD9nJQhSvhiLH4Pxi5mezjwRcoQ4ejhzQ+Ylzj8Mi7CPsXNwxw1naoQ2PspFw+6OXNRwcr6OEeaeQ7FLGMsXIseMmBxWqGN3o4Q5ezh+jh/gpccjoyixDixeD91oT8EWdQ5Zmf7oxyx2McMUPwvXyVL6MouHDKL2XBFw/ZfTA9Hs16WMevh0/piEeRcOGOMeljLOMosXdVwo4jHpQtMa/IcKtHC0zrjT4P0fRjLmxxYp7CXguDR8MS7hv06XDFoh9MDQ9K2xD5C2sUsYyooYihD6VChiiixditK0eiFpQo//xAAuEAACAQMDAwMDBAMBAQAAAAAAARACcYERIGFBUZEwgvAhMaEDYnLBErHRIkL/2gAIAQEABj8C2YF6LuVL0EZ2qFDsOxSLB4KBC4Yry50hQxQxw4W57HvRgW9Qx2KciwZRSKx7jMu0KVDjpDMj9ByvQRWL0GajFbU8HiEyrA7wjE4ZiXsXPpOHC9CpmIY9rhsX8TKMoRUuSrBVeEKamYHGZZShemxei7mJqEKFNR7R3R4EVcoqK4RSOXKl2Fb0ceihzkd4Y4UI8RWOyHc8QufoOxVKKoS52KXCl7cCl7UOaIwO44xCllWD3I8GnAh2KpRVFJpxsezz6KnQW1wyi2zMOFOTwZhOMMqlXHCtD2pemhw3uzDLIwPY4Uq5kV9mCqwxihLvOm2qrEOHscOwhzUtqh2Hbc9iP07nuMnzgX5iiw7SrjXBr2UIcOPuZiq/oVC2O0KGKGVWhCFDhQj9MVxXcspsO0qKnD4HDluFeVtcuHaFH3FDKrGRCFfYhCP07f0K7FmWUXHaGI1hW1K3DHKUKEL0nxCh7HaVYV9ivCKOF/Qsx5GhiuY2JCKuPoO8MexFNtyHYQ9lxC9DELYrwim39CFY8laNB3PIhDhIdzMVZ2cucCFKGUjlU8+m4Q7QymMCsYZgyxcoRULIoqh1dRIQh52U2HhQxC24KppfMO8rYrRVCHNM0WMGDyUsRUuIUO59xcsb7aiQirM/YbKfMMQpQmMyIwLatif7R5HLlSrHtMSmYF86S+zPsWLsYirOzQYhiFKEamRDsIp2KFC/jDvL5l3hC/ia/tU1C7opYhFjk6GnYSMiKs7XFQrihx5hCmm2xQo9ozO1Mcqw7IYjBUuSiXKuMpEVZhRUxKKrCFDh2Lwoa52qWYjIhCNOrHqOcDsh3heCpFN9mgjEUiHmEdBlIx2EKcDsU7GVb2YjIhCEK5iMGB4HdQ/In3HwxjGjXqoqhCKswpQ5U4GYli5Q97H/ABjMKKr6GR2lWPA7o+cFOUUXKxlV405NejKhQhwj7iX2MQoR43MdikdvQ9pkyIUVQpweCo+cGvZj4YxcoY0UvuaM+hSMY4UK4z8w/nUW1zgVhbHs9pkzCh324MIqufOIwUWF86mIzNI4wMUK4yk0Huc4FYphQ9mIyIUspl2PA7ijOhTw9I+d4eHKGPszA5QxDuVbGZKhxgwIz/Qoe7IrQxDKLS7HgquI17o8Mq4YzzDtKHeMDvLfZFRTYZVsZkd5xGIUPZ5EZEIqhlMMdjCHcwWesVcoQhFVopvGRGBjjXq2LkVocKHuY7QttRlilW2Uy7GEO4i6Nci8CPE2ZU+xULmEMcacCMQ4UMyLY7jFsYo8ihC2Ux4HYwiq4jXsypCY7wh2G2a9/qMpG+5kY5W1Q4Qo8vYpZYXceRfOkKEXNBS7Mwiq4hruhOKrqEUvBxNJkVxjPvFIpxLMiEI/BYQhbGKFChFL6QhxVYwhngp8Cj2wj8yjQ07FMOVCHcxORXEIwIYtjFPkWIU/kcOK2ZQ/nSLMfb7iFmMMRpCsK4xWhn3hXhGTGzIhbKRbVGGPGxy7DGVmR5i6F4Ee4+fOkcL6iq51hWFGBjmlyrmJYriFNNPTqLchGDxCMDmoZUVXPcOE+w7j4KhmB2hOKMCQ7DHGnYUPaxQhCwVGdih2EYHeEOw5Y8lQuahXHGnGpdFy6MDsVWhodymKrFQ4uOVbYzMoWCo8Q4Qxx4M7HNQyq5QKafAuPoLwLwI8FULwMQ2VDHCY0KwxWhjGZhiFHiHCi6NOosGRmYc1QxfOgrQxrr9xvJkVxmSsUXMxUMcaGvY0HsY4dzSGKwozChPsaiwe4eZc1QlyMpEOxU48DKjJXOnVC5ioqHsVhlIpYxwyrMIUrYsGd9QyyKxWFgdhrvHmGZP1NmnMVbVKHeWPZVnYpQ0fVCwZMmDOyqx5K2N8mn7RYHYsxmRQslYttSFYUuod4ZVDGPY8i3LY7jhFMaDtsqtDLng8ChWP1MihLZTKjWGPkWxWllO1mY+w7MqGfOSk0KTgQoSwVHn/AEMfD1Pnc8R5FYrlPuOEKXr0Eym0qHNMIdo0E50GaQ8lUoY/Br2KXCuLyVToanzvDuU2KxaDTWlRp2Mmu2q47i06GnUUuaZdt+nAhQ7FP8TQxF4sMpMDuMV0IQ4eGZKxWKrFVjJpp9YdpquVQmtjhFnNS6y4ezQ+dhWFw9BDfA5aEIqsZjxGuTQ/y6a/2OyPyOwrDsO0a9Uan4nhlco8Q4yVSmNjjGzSHcpKqe5rmKVkS7i8CEIqKT53PGzQfzqYHYVhPv8ASNYaMzSVDOBbFtaElD1P/Pb77E194fkfBrGYRcpZkpKig+d9lOBSzEIVzgqhRSMeNqlDMQ1/9Ghk0lQz2l0czkcWHcpKyg+d5yJ8GYQ2N9XCKbjnMIZrwpcKUMscM/y0tttsp8CyhroKEOKhiZUU3M/3swO4yxjZmWOKR2MF9iuOEO8adjTaxxgfH1HfUph7KlNRTgz/AHCsIwVDHYplXMmsuMQvp0Ne0oyVRkca9xvvvQiqkXKKT53GMUOxiKrCwO8IVhlYx3QoUZ2OFYfArFW1xmEaGg9uITEe4Uo07H+JiXYWB3/5FJgdioqHgphXjIuRitKKjA9rjMK0Idxw5zCqKhiGLgbKWazr+3/gsFQxWMFRVcqMo/EK5qZKdqKhPgUKHOYxCl7GUxrwOahI0KWOKf4ngd/6HGhUVFRkcKMicNTSMwZhQ9jlehwVeRWMTdyzxFFh2RVCFcqwVFWzUQrlymwzEU3HYVkZhRgUuV6K5FkxNjVmg1NA7DikVx4Khnk/Jr0GUmRCsMxCMCshbVLlb1FJ5MQzMIwaRRcdn/sYzgpHgdx3HZmnf6H0LlDMj4FsVjBhC9B+khCuI+d4ZkcK8r+R5/2OylXHc9xkdimEUnuKoU//xAAmEAACAgEBCQEBAQEAAAAAAAABEQAhMUFRYXGBkaGxwfDR4fEQ/9oACAEBAAE/IXRo0jpuhY3Fd5SB0PyAdAmQ7AHcw6Ns1uChE8wgXWvqbJtbDLg5FwC0DJSzBm+rh1jVH1Dk1p6h6CvMOhrMOFMPAwMgDbAK6TMtvb4CAbPrgB5n5ms3pKY2wLOP3aBS5cpovqhfYCB7oE5xthKGLok+YRw2ec4tea3CAcUAf7AogQQQ5qGy+oFW3fusOHPzFr7CgW2afRQMbA1lSQEiDnXEKjoTPI/2E7C0D2/2BcweYcoYf3mE5RgQKI8fH7K2wDc4IQ7/ALDzHCPmJnRzU2fn9gQvh4lU1H8m0jbBDoBvuFMwHD2DzMG2zQcpTEa4yyeDMztocphLAhTxpC8ISO+vKUnH8hct+oCsNQIL3RbqIp5ie0Kr0HkwcMszAncD5mxvEqmsiYDO5BsAyvIgzbgD3hshzbHCaLY3WdgswC+DCEjIA/yJPbXqoYJA7B2ZA/JhzWvkfcOL3+pkOB8QNDQe8pr3dF6mBnA9hejKA2y/BiEDOD2Mvmz0pexGWcXv3QtgBtcoVoiv5/I23oMOtBkQrwDRA7QiiouTaa+5Q4LauHAbjNo3wYraZah14yqG4Q46vE0Bqog4JmY224GYJDB9QGg3F9Yd6YG5oO99oVXhMitkON4L6AzINEADzMSOET1P9mR3r3NQdE4GXjXn/s1h2xNLOrG4qG6BO6Eq7JrbUDxHbQV79Qr7xXWG2cNsb5gAxXvDoBtbrGAuIuAR1YY2GP1e8fL9UJ06EjnCz5KIxZtOwh0IOahFgDq471TOy9xwwOod45voGdzJPoTLJeD3peISecu/8jpcrae0QDb6hkoGT6/yCuAL+6QEIHCWGlw4QNQezBpDk7HDk8B5nFCasTSZAlkhVcoMjFiadwPkQ6LaocaYgyGPlDieMJPUB3g7Pf8AkvwQ4Ef7BQ5eMdmtR93gyaoHt/sPgIROZP5DSIjhfDMut4g1asQsiq/yEy2PzN2154QLDcQ0RhUDgYcRGiEChkMOY/RKhbX6grdB4hxFMPxHWiZK7pRBtIjTWihEjfLl8ooGQ7cX8IgFdldIq0oDzEAreh6R97jbRAWYrEFMaHq/UAYAPafMyAGBDa4wZ8BANDwic1jrMkcIT5jxwlEHhDjuMLpD1BRDDuaHZEA7OvqDJ4+4ygbAYqu8deB9D3Bq3+pm10iWcl+QiyNgDv8AyGyc5gYJ7B0+MI6NAodAyw+EOiBAN7ZvjgiErG0abTDxCYDlGaQ9/wBlBFMAHxm9fkocgk6/OEIZGxCMBZsHEH+mdaAehM6QjxEx2keIWQzVHvAQh1W+ZIyC8QyQG6BgXIwX5mEG1CDCJqQMY7Q4rk1UA23R8OhmYrDQFmA2j2/Z8fcocn7MJ8zVmPEFBV4gzHug0iyO4R59Y6W+98XVepgXj3Ck3q/Eap9n+QghNcPjA+hHrp+mMgDf6uAAPX2hyQ18FNHvPOo2drE2PCXYAZ9SzPri1Y14QEkmpXcRlpBgALodflBLDuHn+SoNfbMKsFvjw1kPEAEbAB1gLZwxb60iWOz7HxZgg9XsYTTcS92P7GAB7B3iNJDYW6nASWhPeEEqoZBJn2MBTaWX1/kZh6r9/YDRNbYFLtJ8Qmz5HlEYRCGUV9xigrzXn8jBswT4h27SO0Kd7YSLPUwE0OUdb8TIQG+NR5hyt6Hq2TUZoYp+ooRwBDe4b7xlVXCIAVMxf1QCGTcu8KRbwHDk7h6lQbT/AGFV7XNB/wCo6+NDCrcK51GTY3+YRJ5oBN7WuEG+0jQDenmGsnA+9yiff6EJiCKTuYpdUGFsBnPU/wDZcSiJHEH+xRVggjrAUDqQ7iVCdQDjbGzW38/sr76iA1GX+wG5tHoIwAaKACCTTPO5gQ4t+IR2qD4HEOzoF3UzAGg81CtNpM3hhZNZImc1UoxiwQOJMJkCB2q15gpOBAJ+uYDjNGMeYcN4X3eHk2Q5CeTME75R5QntCF0qFQv4gw75xxTrBgYNYSmNo/vMNlPUdv8AJl3h/dY2SoDjVQGhYVnrMACdFwcdtpIPj1PKcOjjJ9yzjf4BARHSUOCw/UJoVshaomPVOQQ9S55s+/7DYXkR4hZBnJHOxC1YAvnKkya+9RMhvkEIQDW6A+6wsEdhI8QyQcfGDKd4d4dSGR5MxLMBiJ2upH7Gck1XcmO4alQ5N7I1tw5S7JGxx7BhlSSG85QcEaCv5MVbXzhNkrEyegQnFqJqiL/s1sY/YPA9TmsQmnCYDoiO01LzUolcYQJ1locvnEcDAJ7y9rHr+REG+HZQ0hTEfXNoi4OeDMqsHFRNIyRQ0qtB6hXvEDzBlWvS/wCQKgbYPae8VgFk9N00vbOlK7mF1uj7lUNo7f5CACHdOL/yZeEd5ps/n+TYSDkDuJcgbQxKJOoZ6QYPLHGd8zCNBhFgwz4EcC+zNyc1MhG0A7g4ZJCNgc4QAQAoEeR+QyVAFkLvBSDQbdV/ZTLU+BDllKBqxnMTfADsOiVN7fCjMvRdP7A9iz7g1MWI1wpYAMbIHahxwHxMCtgHmHJpSMm2RjTbmO2Ftg0aaExWgB8j8hL5H6iAAciocn7b+R2Sd3KAriPnDxvHcfkKobXKpQsvOVFLIHf+zAkHJPOoxGimfMdXlzarAcLJof7BSgimekOjWX1MtC9QT1hLQ09RnWLp1hwSRg05ygNHu0i5rI+c5Z6oHXevEO98H0hNJ09C/ZhokjUvHASgIAGOlwcy/hhFRMN7gWwCHc5k6paw4NLJuZIMBRzRY8zYqmoGiOvtR7CCcGWG/SZyFgnq4eRw3QIQ4Alugbx1hBIMQNrg3747dPUoTygWS0InSUJYJ1B9yr5w5v64Eq7A95gFp6JmgGAu8OddHNobnKA5oM28+v7LBOAPMXOqeopK0YlEbzMNn1ZM0u371NAbNk0wpk94bYi0RH6XSaBQ0K0lGgvYfcGEd/kIDssn3SaAM/wRgs6voYmIOiR7lwdV6GVUMCfMAMHqeWP7CARbx7mBgYuWJiyIFIw6va4JNlWT2H9lnYA9z/JYEKbXiZUMVATCLRMKAxmXuhVQhEwbK+6xyLafRw6YneVKhDr+TAXqOkGqOlQKPH3ErjCHbROeJMyGyDW6fswtbw73LAHnCwIGsa3y89SedwmwJhmEbmYY2BdOYTvPqHOxZ6BS6GSHeojcnaHFsBPeKsbH2iFHJSuegxGEnVmZYTI9QPMZRDFRBdIi+pEYXS9P4hsQ0IeX+TMAsN3hokPXwvyALCWEM+WI92heTC4REd/7CbZtE8cQqTaT5goQJwuNQiNqX3iFYDXmZAPgDLhFgTQ6wUAEUAu0Rmogo27tMi1g+v2M7TDR6NdLhy6E33l2as9YdcnCeN/swyzHY5QrKhw3mFY2X93gweZ4Zk2VDg8IWlaAfdYwjQnxuYPtYaAViE3pWJmLafEIpdAe4jvrOIGD+zYZQd4c7mTCUXoq6j8gf0bl7h0BZe5yQQPMwJ1zCsVfCWRonmVAQwByicGBBtivYimzTzIhhDQo88w0ppgOhgLMGPYH7EQnCBlAECi5XGcAff8AZ4vyENVK+cOQsI6fbI5ApAPfUogA13gBAwnl/INvqAmgBZAlRl0+0LYRaEJpWnepW3vFInUWeGPcpplPyZQT+KMjw/YaDj6hUZqGyMUlN1XCWN4wykjQKb9GDkQUJ1YEOCdIJSMZ6wMq1Hmv5C1htPWFMWiPaZfP7tDk8TLtKAJGAINhuJlNRsDzCbGxwlgAjQRudywBih1qIleSfu0DC6gAzIRrQhADnSVXwQ6wTp99tmbGhcRCKDm9P8QTUdCe8wIYBEd4UErPgZYpwCN1QCDJ3UzTo3j8iVXgOCMLRVj0JRAME3yv8lRuhY1P+wQqbKAlAOT4uZNd/wALzMCHdfukLILUuMzU/PUYZt0O83CFc5joIhh+L0hB1gA8sTBihjrMDBqrJ9GKA2MQbQ+f8gHLjMG0mBKkHDiCoOPPZjpA0B3CaBQmBBaA8iPUUGDy6H3Cmd34TLCKuoDyXDdNa8Q5ICKxCvHaKz0EDGSBgHx/YTiqZ9wwRTA9QqGceBLQO4rVzgoaEawUb+6TWNhVyM0SCUYppAoJRDDtCPN3jBoIau4EOT+AfyEitA9IzBp9aUqRF0OcZAGNrrLDNV3UCrwic8BDL0WSB3/kJiAA9eMEEdRA3AQw1IXUXFcFkn3KARtfaCk6NBnuz2jwdPv7OfaYB09NeswAWzk+0js5VD7rMdSEGuP0ZkGgfqDPFdzCR7eTDgdoeQ8oQWIDoHzP8joBtXeMIcfNTTl7MFqTd9I4naSPMHYZbtP7CExwCSdwg1EK2s/eJk6zS3+orBDJZ5QDK8R3H7EY8XNMaFY+3woUDgddIpOMgQ0xMC+kx4a7ypkN4mZsIgSrd4hb9j3Hc9WuK/sdN7d4YACftiA2Tdn2/YY2cQT1EoX6jLI0WO6xjqI8KzY+5wlgtCDupQcDm1A2rNq0cJQ943GIVqLbZvsYaFFCPQCGWyFrkPc220mbDZCOtV6mAR3fdYkFZwfAEBswiXNAdiYVC8nbM3dD2Av1DtliMsLQ+5kd0bkH3mZw0yP72MEuYyB2hNjtLy4RzP0YSjOobzLKOEekO3vHmdZswnLUGDJ4cPsmOljI9zVx/JVXTPiA1Yqz1/2A7rTng+oeAwd4GWD0ELbrURE4TyZgd8KtwlN2VjNn9iBKGB4jqskX1zBqaGBKl7GgWMYyqAG0+YAgdQEYmAGUR58mEkGCXqBZka32eZoAwQQehE0KdrrAABFGyPoAiLqA2jAhcdnmKUjSHS/2EsxFNkrcBiJLAylR+U4UIAQKwN+2ITF1XT/Zdzkhnmp2s5AGFbDQqbAq/cboeYiN35BBFvJEMNtHzBYNc3GEa9td4TSwy9wlgBiIhqBx0/JhY1i8fMDZu0YgVPPwnfcfE2rgCPWiO0Cbi25r+yjPHm5QAcZa6iZB2gPnBYPYIa3z+TvZcHZrX3eYR0/ELIVbPMICg0vqYC+mJkt7DBRAPEBsfm+IRM6H7pAOKB0hRbUF76MoY7QzyURNvHYwlCQ7efhCKgEsXlxqrFepbCyDJ2kxQ4YHeK61pyUTLepVWpKaObAgVb/7K+MVXoD3mUBZZEyYSQgLgQGjI9Jm2/WGjO/3NIQlAqRsmAnIBfdJYoYrdU0Hn8j62RALA0IIzvh1ZDAXMRAt4Kam9iF9giLyMfn9mVqj4nY7hssbQEJJuO7QyyJ+Yh5FZPqaQ1TG+BRZs9x/ZgXsH3iMoWT7lw7AYgAZDld2j0MOxrXmZtqY3/XNkLz6fyBAubICiaoTLc37zC2oI/gxjsxdx/sBLAqr7nPIPJlgUaJI7mZD6it1VERBDUOMlFqGyJwQPuWY0AL6+53bPNxWwGsSw4aZAYdwYfmcUBsmhUDE2BPeJYuE2La7GERxv2Oni47v647QbB3h0WV7/sfqDqTCWt0669ocBu6TuB4h05+ZQzUiOYFd5jGxgfc4dAncTzE0hRCDwU1A09TDiXnfMLyAAJXJUwhXnvxBsoUzysQNppfMwcUWB1H5BRjqoA63MYQAVeBUMoLAmvE0w0cIKoa+4NjsDhOzRhcznV+wWC8PMFWOm5iHOgg+A9GAtIgeh/s1zQtzP9gN1tHY/wCy3QwT5P7KAF1g+RC4RLHD6oIGdXCYxgiOoEJAIjBJL7QEQILQ6qbrIU1Vk+UORt15EODLWZzgi/QE9hMApj0P5O+A+6wMdvoZnVZHgxCQ1/phzG98nMC8091zxvMGi3B3hhTsAn17hDy0AmJamHVbT3X7Bas89FMAYBfUQwR4Dt/sAqdM8IBpsxMK2HxNB+xNIwMkdF+pgHCA8ghDIZpMjGBUKyeC6wKyp+YdPQ30McCBw+0YqwAzAAKCRkYKMkoZQNB7vM0icxoJX0e5kTOOrZ3gsL0Jgewc8GMFZRADkV7EdI0J8fyVVgp4WINgimehfW4QUpt+CIMpkeL8OAkDsuGz7WGLMBjvDJdkBH7lCu9/RzGKgRu0EE4rJ8f7PM17jDk3pE4uY26GzKsv3+Q2QLBPZe4fWroIzbxXf9hISd33eIwfFxOsVzhskjBqO50THP8AYqBqB5mReAAHOZQcIdfnCveLNQ0TKRHiEtkjmP8AY5CXYhSVp7hVBGwPEYRW6ZN23lNgPPpL8GOkrd24bdqEHIAsk+IRQy8usFDWf5DdKT/JiBGKgLCcDoVAAaOBgcAl5E0ZdV0M2mAteMAdH5qcQkDwhHj/AB5l1vA6mAtOo6gx4mSQdHQn1BYhko8zGDxA+AfUIYA6kPEcRQYI9wxFNEOW3pBqDU4GXGGV0H9hPEkdCf7GD0POMiv4KbnX0P2Eslz4QpRe1Ao0YHCx+wk3flkywOmSt8LJ7fu0QgzqPMAB968CHNE5Ka9h/ZlIOgH32sCyt0R00AAJYkdV0/yGwmwiB6iXsYAseso1Mh93mh7xzmjRECCgdV+mZb0PmEVWkEvt2wECdLh2AaDMdklbtGoHYMPMjhQ8Fyw8H3htYGep2xnR1B7iAAB2QfUwN7+7ikmSAhDSAm/UQZ1gN7mMcse/5AigBaAirqEeigAADyCAqspV1mJF0eFCsjQIed38gC2CvukRXHp/IAuAizvlBUNkYuoGAL2HbiAYTse6GCzCBHB/yYryVALrAXkTU2/kRh06oehhAA3Bd4DAhsNt8xHRvzEsGCYoQqiIRdDT1CsnhMp4eoz5gOPTgfgggytH7jF9soetOzlEg4Ov+Smwx7iNt/kZBtOyYEVdRXapd4cQplGv8H5AoPYT2mt8d/bZZ7SQ7OIgTqEDpxsSaE1jVez+S4pmFR4/sxbVMK2VyExW0V3lwbDGd4mCzxdsuDRF9zmEjCHt+SiACMgjoj4gOxstnUIeXLHKy7DWNQP8gjAxR43iA3JGQD4/sxCmBHBwjlgw7IYBEUErv8IgBi3UFmC2AQe822weNxIeyuChZAA/YnDHrFlOg/kOQ5SXWZrFjlMI0K+5ERZztPeIQ0R6ZmRSZf5MjesyO47N0yW/1MO8qCwEadYBR5NHpGWA2v33ACTDAL1FAbypkcoPuCYjg83AKPGDfBCK385k3fkwGN/j3CACvW+SEKidTfaaB/1mDFtPyDI/nMgLalBBpuIo4SN6fGEcmQ+s1FadkJQlpWRyBigRODD6QWR3ffMK/VPf5BTMIHOlfggJcbCOTH9iQWoIOBD9w2uh7H7KE7QTyxBrwrsjILtjqH+wmc1/h6mXvly3it7MDPp8o4YyCF9vgVDoIR5fkcu9EOEbTzzBYJJ/2IwEkJWpmZhYH3eAdHBI33MFtw6jv5lf7LGQnUythHuGxyHgwnVthz2dICmOWYBi3xIAHHwlgfxCEhASBeoDsoAq92IzIJuxgG96/u0DcZtlSyONZrKw+X1QMA7RFicIjvDkHf6/ksEDXlNpj+IFeHswEAlsvtGiDULtBoAtXGudznCkdwPOWFHa91TL0bTaQI7AgYH7vMgY/EsAJ08gRVBq69RpDAYu0VvMBSGmev8AksEQNp6g/gjOMh1tQqE4J7on9gIgYHTYDBRWl4hmhGoHWMQADWOwKw8yg4SPmGafBu+csMV/UVnn+S90dbAOpMqci2fu0Kg+4hMl0a7QGBWyBzEEusIHxKobh7uYjh5/yLlgE+Y2gOA9XLTaf7KGTsjLLALCDvNeUl1hsSMtM72nxMAtAepx7IF4wDa394bwd/F/7GCIWLMwhqE9/k0KsA8WIi3W8wKx48qYJdgeYTtMepQWv5CptJUCM4hwtxuaG1rmIj9kjS76FTD0G1oAYguADsPyECw7ByHSaHqCDuX+QklmGnl/sMFRyAeNge5kWhIJ5iXB3RBHRTKDlHyjAI1HcSwARq6Qm52eVFGRs+RLltQfMRQWmHQzJ3+ZgW38nAekdz/glltefhMPQNjMZnqz3jYbRzKlgZ0Hqal475mIxX37ABtv/IMN5uDZIb9ze1K7zT2Z6QU6+cB1MADnf8g4dEHWZg1j2IS2YZjMd5gXt/Jt/ayyJyTALAmSYZBIet2jEBSQHb+zS8P9gdPZs3xtFfoQWYByxGWN6bhCqgNkzzX8cTIG8+IN8Wh1/wBneeViU6z1kCP2YO30P7LHLR8FDOFRgOMDAWhGWnyhCB0B8vyGb9hXIv8AIyCCI8CYbtC0e7glxqL7CAMQNQL7dGI5BDn/AJCBJA6roP7BwoEgRzMK+oAAHP8AyFg0Y7iEu2g9pQNp2xOcAIDhOJUxbohwway3qEAICKAHIQ6CCceJe6sbeE3ADPKo7Z0iI959wAkU4ZGGV79REgd/xglxCLAG0DkJYkWW352Ah0rRzwX1/kOA1J66+IMrZPITBXIT2mQbHBxVnPGHDj4RLbIeJrz6Zmo2exBLAbIgCXiBAthIlzNMwLfOD0jTN0GYYAB2D88y5AQwXOx+zBvfbqfuJfgEO0KDPCe+lDKpYh0N9oAxTocDSXLaCea/sQhDqe5he4TDAosePUuMv4fyYAoppuUKnLJK2OOAsvyQNl2SuHwhdjtAuKxOdlQYDUkOfwmkFUYCF15n/h2IOkQAOH+RHWwjvKkN3dRW4BwVkMOd5gTJjK8zXjMwcT7goR2uHzlk3odYVv4YDhRBoEgeICgY2wKycFdTEWa69JuN8GD2E/dZp0x2KwMBQCbEQgDwaOXuE0TrxDvf/MTK2n5KAVp94hNgwvKiEAO9CdwZIX3EiYYyCfBmVbD4hipGofUQtjifMQmWJZu0lUQbG6I4KIRoM6E/sI5ggE8RUVTQHkiZQBw37tLO9jgV/IbfwF7AP2MK1El9xEIAgh8iVFgVyhoXsPcw7TC1mTTJLdAe1bnmIAMAB9J5f0xf8SgwGHe/JlgwGfEMZbff8hBjtI9QBkNCXiHG9T92nB2zWmp7QY8UdiPTdC9N2PEAsQdT7lEWNB1FwwTO0OuIxMsgvcSIQLDYh1hUW/vyBM2XMAN01Np/sco1C6/7FLPwJmGWg4VBpx9GZbH+fpm/9mFohp6EFNwo9DABbKLF7IDg3mUEbD4gMAdovaKnWS4kgQKKwiHT6k42qDIJ2h1YhARvU9T9wqEaMcGjBbBOj66dRCZMm26R0UMH2R+RIpFAF9oXY6kdRECgucMcESrUVDAgNUB1UVDAAcJsG3l85lI1A8QgDDbl7+kUDOvubWcrtMiQKu98xFr6gAktUJ7RPjZAAb8f5D6C/M1PF5gfOCHanlGYbL6KERwBeJQstc7qgMXh8ZnHKvvDQN/6TDZGaEDBN7IVWx6BhxDeXMRxA6f5NZOMQ7N0PJQ7RDecFK1Ylzg9eg/IAp5S7mMrAYJ6C4gjIIDebqAOBKQ659R+BE+JoMgHlQglLoM9v2ZlgdomSDgh+6wjptkwCFHCPQkyxohkI+6wqwLQbFP8MGyJd+SDAw2EOrMRMigB0BB9yxGMHYSp2kAfcoQmJwEN5gonssRyuCaQWhHmap3rfUCs7XqZ1qB4ENn4+/8AhgVx6SjVgJUsYcwLp+ZrO0vu00+DsJgM0zvDgyQtS4MjFlCMTCTbj+xey7yiIun1/wAjQJA3bx8JziI7fyaobPcDxhyuXhTW5s3C4rHafH+zQFavpMheeZYhIoKacnCT3HPEalsPgTO1f7H3d9xMBjU+pk3y2OowBaF9FBqHAJG6pksYACm2ilW2pgkfjAgOSoH9/ZQIjIenxgFADYP4/OkCJjleWD5lSoNWeIUxPBWdygNyRgPkWPQhIBwAIQmnZFLHPGBpbHSobOHZ8wLgAXQmFH/X+QaNK8Td6n3K2RSAsEdZYEzRO7EAdVAk9ox7ZQxPJNB2TB3UBAlW33CGxt7mYKnBPuCzzJoHVQ0F2qYjp3EuisgQ4hEF1TA4ZHBuGiAsLs4NnZ5mV7X0/wAmy/r/ACcVBaw7fAJ6wYI5s+YSK9fma85D7vAX1HmbCv8ABMw2ge8JBZjzCoj/ADXyZRWgh3FYB7GMi3FchAnPAocx+Qrc0+6ywn9bDAxdd+YWKimXyMu2SD5r1BYgMAR2haQRYnkLgEBA2HzOwT93ite91/kqjYMDI1V7ooLCBlyB0JHW/cZA5yiix8DHDdAPYzdum6B1SeVxtsa6yXaMELZ0JHqO7wQfMBYtX4joToz2jMBgA+JgntfHMKls/YKZt9fyJTVw0HFR2DQ/eYLHEIlix88QhOdCVyGYCyE8FzU01r7MBs8BMgsFiFlnHxDkd8yIgYe4QAQnd17z/RNFoIgwxVvuYMcRB3VGZDguCg1BjojDsBYEW3D/ACHQ7h93hVTT0jNQ0EC/JB6EO0bR6f5OuBL5j9h58+YNGlinKUDm8Qv7CWbVB1IhZ3ihTIsEjxa/sLD8JMzMrHxMChpHDeIH3KCQobXb+QyjGGOxjgGwM3tg1EbEHqIQS7Y1E2HrKmFQQKCMH++4oCMkLmYJIWWn1gLjPEzWUAfEIst5Pf8AY1t/f6Znj10ECQ6IitZImN4bMKmNvvCntU7QASNpEGwtn3tEa6oLmYTsNg7TPXEK0aHsTeO2VPCPcXq9TAchB1hWUch6mAm8+TCktGfcyIdoc4MZ5mkuoEebvMCBuL1IfMlyH+wAADss+YV8/LMGY3FdZbDiD1lAdUO/4RAAOo9Q/sLB3Qej+SmWmS6L1KgNlLzAAyDkgOoH7Eebx4/Y5Ea5ggtnLfdINicp/dYYDnR/ZsBKAhXaY5VMM4cew2zL2wsPtR8QbRyK7/yKRWF5wZQ2iPRTuAmQA6FwIgNFNntd8BND7EGFW10/Jqe0+THKMr8h1NrgGBUfAjkTzPWMmxdlQ7Ld5MsFdvaYs7D92h7c1PfERjQlgIUBzqMSwDRhCbez6mgM2fP7MGsJuyTGZ4Dz/ZhHb6hlKhFEUlD2Cb7RGW/yIa1GyLgUnTy35BGJQYZ4/suKyQPMwSRQ/BOkAD7lCdgEAeUBGNLdYUiOg9MxFP8AW/cAljsdhNLoPQlzfCDYgBhHgrlRSQeb9RYFaDpR/wBgaFL12/kyxtqBk2/kbaYInoOYRDF1OkQGGESOagbLBMuFZfgw6C1g1DH+TYbR92jo4dEIVHawe39iEDsY9YIJMbCgZFIIkcFKMBhrchBAQdUmNv8AcxraDxT/AGDLNxk2qHUOn3mA3Y1/YSIyQB4RA7YAzRtkl3mq/igyEaPeDjfMKOVvlScTBKAVw/hm7ONOcJAoaHXeI+0wGNP8hLMdAT/PMwJaE9jBq4Du5QBHe7CEEfkEEXioqAGCxyNwibDaLmCpnIBB9P8AJQDoH6iEOMdAZQK/xQ0QsKACRyFLDZtbx+QgwYV9f9gIMNAqYLoDznMM+JYm/wDJWyWBAiR8DM0pghzBA9TGOxT7cJoUwoMmtOUwK2jyZlGwwMaIQc4LyINubmfNRgI6EmGCGOA3KoMBotm6HUdvuGuQDsICVJyw5hRr/IWAVQsEhsMMslZXf+wFkjcYdev6hxqz14/IMxvI8TAToH0UIhUGCPMJEDqD5gi2kORGn7ARDr3mIEE0YJJgHW5pe5kaBDjr+QQKbFe0YNPxwuxWJmQGojlp2MAgAVQB6E/sIN4APfqbNIj1/Yyw5IHgiMQB1M8o6bBBXSHQHhMEWkoBCRqVygBgNB6EwBAE6GKxO/wJc9pvtByWU+kbb2h4Cs1C4iMDPW12gsGtIVS1XeZgBgu0WRvghGrYcAXYK8QuzK9w5cudKUJB7CEwCRkPj84cFqvnWWQOirp90iADSrxDo9L5qCgHZ0gsDmYUQYXyiMjs8QKo0V2FwhIEaztow0KjVswREAN/7gCMEfEYFh8x+SwdXcwSg2ry/cFhwg48AunxlRclQKNaB7lKCKHPMBbcg4AD3CLZnDwJzFD3MOsC08mFokN0cL/YFU7J7wCcZPl/svxfg/sG1sAPcQ7O7bjYgsQJd31l7DCDE5xCoZbHqKRzZHmHDNX4gcZ7hBmhblczLdOLvFRJQAcEkUFEIcMsSyDbDx+w7BlxAjQ9nKAdt+4BYDJPv+xVxD3OwH3iVYbD5Mw3oJUwdb4xsE6BI7exDWLBTl8YeLgN8wCAbSHHHqWLKP8AT7iAAM4cdZGT7hX47N/9gMIdS/uUIAQTRrnCgkbfMqtYPkCaBMfmHufsHQrBHn8hFFon2lQDyQO0IgwECUPusBoYIxvgBq/18YbIep8iAjet9APUKg1LPeUIHT2EwADoB1AhaDYO7P7AuEO4ZlBOhH4gFBZBbxKFOn8PqBS3E42GNvYOLGgneIGbopECjCDGhZ4D4Q4bE+4hNHNiB3GoH3edsRMATvF8f7F2wgNqgalVCwhNJO2e/wDIaZhVh2K+5QAVqjHT/ZmHUP3HZ4a8mBNxHib2v6f2YcaItY7wCyDnfvmtuJ5GaA0vzDpWz3DqNiBvWMlHHebA2iZdsRvhFoGYGj99UKSNqLiYCV2DApts+JRJwXNz3D5zjFFoREIBgX3/AJBS0z4vuZQIYIKEShqx79QLAXR8xkAylEBmgAHiE13R7o/xBFJggjk/7MG0OqGgCx6A+4Kp49iIJCtg7SkT8LEsxwkJHW717jGIryZlo1UACFgyf2Wc2EOv+Tc4QgOEQTt+UA0wyOsoYRYMvb2gKwBkiftYYYn+f2KEcrLARrKBmw+Y/wBhooGQB0Jgah1XmEDkz6jYYqYHGC3OJgLzEYNP2Hajb+5Tsg/nuX3CSOVfsyQDJY3XDNcfR/kIbdXBlqLHUfydCj4mUDi5o2sQbGEB5S4ScrxMmgIBisXgnpR9x0FV+xNb74Qhk0G1j5yoG95qISAhMHkf9hyb1HQH+yrPwH+RMRx2LXrDZtGB0js3Ya8TQGAV3EC4KwVzuZANEE9Q5idj8f1BgkaegfyJl9KhIFqw6KYhvHkQ4gIZDvZX7AA0BcJiBLMiKGNBB0EYQyI2xRAPMKZrFEH1LsxgE+JwiEAiWe6oTSNC8Qm9EBngoViQsCN8YGA1XWvMAJ7CeTm7tL6w7tX6gCstD4EZTpMpE3Eo6wgj5QjkwNjvA8zAELbxt+oMDs/2WAu2SOFfsPO6Iy8v9mf4+UBYzhW+k1Lf7gAsbSR1iEb4E1KE1pzB/kFHRYPOpYCr8rgWJG+A7pE4Sxov2AiFWrq5sG/wfRgMNZPgxyb0TmSIdcG6b5okg/yBLmO0JEthRrTHgwodnRjxCsL2jt+xgnXJHn9hsoy+p/koBYIcNRMm2v3FYf0w2YP9QUjBbmCvcLcjLEca/JnCGxxhA+Z9w4WC3S5gWR+/2cj0hgFzfsItfUroIlNkDfi9M/CVBI1v3DdsUetQ8vsOIA5FmNg9QPMQJoyO8FGnqvYP9hZfzgN/bDGEJgFCFYuzt0/sqByHb+wUrZM0GAAT2XqcSDJ4hd4Np7fMos6qMANoWODiNvJgQRbKjkpqibOr/YV7xIO459GH4NbgJjJCHOJsQAptMEYgCvWG4Ls7F9CIRB3kFVulijQB5mgk5bvMmzZZ7r1AaHRhngZrDUVxsfkOwdWjUEEiyK7EGAWFiIjAK/oR7gYE1oXaaLUPYh0jK+YWLNcb/wDYBmyfaNV6n7tFoVkikDouPzhYDF8Ff5FBpY/I2w9IxRaC9cax1wMdD+QgIDAzeKMKIKVjMBgKwhAaFZHlMYH1f2UBG7OkWAMpf3vBodEPWAwIF/xwMkdq0gwzsMFgkaMWGoQ3k/CAGO4rtAGeAKHGODBX+v8AYFnfMNPy7lkDb7jbSzUViNjgjEMOqUqcHY+5wbCQMeIZQssdB/Qesoe5AdYQSQEbV7IaGuV8tsSSGMowM812cCVsC6Gavf4gpape4QLBT2b4AaeNb4YMGmD6fkGppL8lpyVx2wQTGw9UYoIMZiqmh7UmAQSND5mElp+3KqGJJDsWcCZUQNQXyuCgsAkwo51qbKImExenlUIHeMcI20RhSdfH8g6kkBNgFgdYGimsPhiZ6B6yg9B4MCx2ipgI1JrkZq7fMG1sfQzU8EB9DMwqgd32I0ONHzYlWigSIdDAF8hf5GDnLJ+6QISgrqBAtCghwmLfAbvY+dGCiFogGKF0+UrdsFzTmwB0X6EtBkn79xhDkXxGyCHA1oQBje7QJ2DQ8kxSYtgHvAwDQD+/kJJIqx+e5oLOxzRmE9f2dCAfIgBAdSDLXq2IKR5e/wAgM1s9f5EbNE+ZVDs5mP7F1Uke49TNvB8iVQBokDuT4EKJF7B2xDZEaAPfuVDvI/YL2RY4UYhdgk+8OYGWOMSm4GOSXqjxxMhh30P5K2S2zZ8GKxWQHAZHgEO80PT3UFEsP+wBHYp+Zk4D8mgaf7DYG8/eYLI7Qek1MsQdMnz91howynMH+wAyCQTs4RgQ2SR2kuobANEOn+wpQSf4gBAZV9P0TGQdfvMBqCQmj0UcFWaPT+TEO0ypgEVdfb5YNhL1CXBYD2UNRJwR5VMuDp5AhOhGSfEsRO0BeyEyBuh5MZgnlNSyXi5imB6Su0fnSAoluDg0RGo9QCj2lRhWh/fusZ94YgBc3l5hoBUHViAKml+v9lNewcyIiEMvsf2ChBVnl/gglgg2ShYagoRDsg76/wBgZURlLgMFIfcplNohCBg1s8HMbXITzFvHWBTvPRGWtYAPmYQFWVpf6Y7fusyPZ1zFi2nxBpDUAQq4v2Zyc/hgHZxmu+F3EHcP3aMLANn91gjrI+G7rDYZAAKAASB0C6/GbBjb9vmZWouCkd7PWEwJ1M8ICbgb6ysMnOw+R+wpGxjqx5EBt4fBt+oRB2WOI/2YA2Adj+Qyw8IfdoOoHJMNqByTiYIjXbMzRvtCsD8oSuNjlEAO1XuY8J8KE9lDB0ff9EKiBSWICHe5gJOH8Q/ncINztlcgPwRG7xPAf5DRC3TGpmnRACD5GZVvhW4wFCBr0hCw2bYgBo0OEIuehmtsP7Gd0Aa2AjsYXAp0hgEbFgoCFCYZsVygsFvA13Qihy+7yqMpHDcB9oKIW2YPoPyBWdPnuEBwcGZkrJL7zFNFC+X+qDI82fucAWTkYhDNrbCKAuu+YIPAgbmb7TQtkIDLelCg5p2MEgqmADr/ACEWDBPkQSjT/pmCZAPkxGsYgZanMTBQvMFs1AI7wGGxB9JQyM8OEIJGoB4ZmT6kD2lk8tUEQK2+hXmElEnLt/syitu1WZQwQaXboJVAMH8/IBSYfaDogPEn+ygNBtaVpA0Qv78phWXBLtW8TASk76QKAFoecJaKP8msHX2P5BIvuMbZMVhgvUGxGF1zHQEau4aLNhxEFCd5HaDorzMWbx2gaoYAd4FgQFBtGq9w4HEPUPPJEKoOCH3hgYaPE5nDhpCA0tPZhOaAYPKpZD3eZsbIDBKyIAw1BA8QgTcoCAA5I9P1ELgqx9yhRJHY42L+w7c4IGdQTUBN0BfSkBgALazC8VkLrBLFPFbRFKNRKjSSwbErME5Eiu0Orr/HuKQYu/SYQabHESq1l9hCWXAB7RGgabO24OKoBF8pUgcV7EtYLAc1LTOSH9g2nYK6n9EFh1tgWCOR/suBGpa5QBM4/Agzh0QuEFg8EeIrzEA8R+Rk2VF3dYAc2S9Q2AaL6y2BxzviAPPtMEcfvMMVtoMQ0Y3jz/IljV/d4q5Dt/spAc0Rr3maPUe4ABZF4mEITdqhIhtBECAPL1+RK2x+ZgN/GYgNzpBxeCVwgCWAb4fGAzoSjzhBYFVsaH/TACAtTj7bAod7HUn1As2gH1lIAsmBKJCC95IjZbePu8DXhudyoG4AdDNUrAPaE49X7/2WITteIQHFHvGB4+hLWDD7OBUIUI7TqAHZ/s2ZGQB3gAG0zwozdLPdANmwk7iZkQOcYvVOdyhDyS+jx3lycaD0gBAIAXxhyGLP3eEXDY9f2bLyP2Ib4GoG0fu8qQGxwGA3PBmOaeOiiYG1AzExCC2xiOCxn3MBDPoTBwENhVZe4cnyi6VRfaNQCgQe7gZHYg0HYV+ygNYJ+7iFoDuxwmnDZzxmNi0YVFake8EEjqDDBhYRzMzaiOR/omfB5/yJBBxXaWNLW3nC9WhpbprRZNcNsuQaEdCQJgdiusYsEJfjmDSShMNp3vg6GPwJqNp8CFMKz0QEOsZFOkrYYTt/sYFMIeVMc3+IOyr/AGIy1B2cKkNL9e4uA4xRYaF1EwE3fgxzHVe0XrCEZCWD1Alxenv/AGabQmOkXHrDsdoa3P1BYAZz2MAkQGgJhNgwa9w0OH7LF8lTJvI36TPOw9rj1O31BXT8lDWv6/kOZD29pgAFj2mADDzEtiGubSWLLVc4AAbQ10EOCnMP2yb06zW3qBmOvpe4AQbGO/5L0y/ow0NlInvDkDefA/YIZu8dl6iibApaNBfGAzWbedZQQ5R6wtiN3giPSaQ3uNsMpxoQmpJKAMb6+EAO+wO6Dj1b8QihO5OBW0SN+6I4arX7dCOfXxNETn78jBvJclQ7Sw1JeNCYjQ3kuEzjUepcCdh6iB21fmVDHGvZM8SAcbIVjQxgBGw9VEN3WZQ2vkoRfCPcw8C7wSKNIesOt4MJsftZit8xtx8QMCtU4E7yj5l3x9QE8TbLtsENBuxFvF6QXRaaHCHHMGagcf5CWCjsqWY6mugnTZ8TOjqYRBhCFxjMKR0b/hEJCshLGebTKhwOS/Sg0fPlAwqit0uGhdXMF3BQAMH2D4gwHVzImLeB6me1jyH8mmFVbswCHbSe0NLorrhEQE7QPX7NdseZlxAJgot+p0zPj9gaEan1LpbmIEACZ/kzgMB9IbrOvuIwbfVTQGAP+wzg/WIC27Axwm3oC9f8MTbndiY94LkTNQ/Dlidf6ELtb5pnX4ZdDefMILcUXN85m4NsOqFtQYvsQgAToYVG4gxZXYzb3iUhyE1XE+InzAMrVp8dIj5VxA9qzABJynK3QKaCFkJsDh3YlXW37uJkN0D0cJYkkJieJ+MMbXQwxHZxwiJ2w9oiHQAnooDG8Z+5Rk+Q9NLhAC066JHuM1232MJvl2O8Fgq2+5cIeA6GYbp+RgbWSu0oHOpEaZO0uhMRpwAOgygByXXSXRgRWi29jN3T0h4rQ+pig1BXbS+0OLWQ9RcZ2iDjR/kG40pUGm202TrfS4cD7WEDx8RJQr0I7Rtm7lugOeBvnCM8fyAF3yjMbU8b4cBm4aJFJ/eYyLyx0qMpbx5gdFjPeoBqVpNht7TJoblhFWPcGgH1f5AyV6j3CFgU06f2BtgWC52I0X2o/k2PDvLFEBEu1ehDEiGdM8v2NC3L36mhkWm3BmLC2uXygkuNQ4RzjQeZP7CMkhPCKHgzQW3uT6goAjAQjuHESQnXyhsghiOSEyD4ahOdZc6E/wCwQBDJDkzFkQsX4iorB8I7A2HrAvQzrlMi2F1gBAiNAOHylXLJfqG0i8dz/ZydRD2vgTD80mQke1Bpxmuenv8A4OH2sGXAwZcfX/DIcvMycP8AjWNvGaOfqHIlC+2TBxPn/pvYvMOeI+4M8jGvh7n14wCxxeDA60PkIfhumXMeBMPA+Z82+YHh4J8G4zRwHueSdungTV80l+Yepb6ZncnwJn+1M+POeiUH5idifEz8ph81hz/5/9oADAMBAAIAAwAAABBkMFpsEAENslhJkgskshtgtJJAhgoglttEhlJlpIAlkshpBtotJJENVoBttIMhhFltEMkhEFtptMttNJploptrNMohMllBgkllhpptNNtNNJtMFtgIMptMlEhEEtlpppttppptt1sstsKEglAkkFEsphttttttptNN9MFklplkkkskgtkpptNppNtptNtJsEggthNgNkEIltBtFJNJptottt9NkgsIsIkMpJFltttJNNJtphpNtNMkgIMgAkIttkhtttBJNJNNppttptEhNohMtNJtkptttBJtINtphNpdllgkAhktNptstthtBJNpNtpJNtttgpFgoktttJAptgpgAJgIthJNpptkNEEslttNNgttgJhANoNtAENNltltBEAhNNJNttJgNAANBMhAAtNJtlthEElNttNNptgBAhAAIJAINIFlltEtllptNtNttkFgkEBFlkANJFthtMtttttNtptpEJhAEIMpoAMpFtltssttttttppolBgMEgEFsgNINNltEtsJtttttosIhgIAgIhFAMplthtEttttttNphIIJgMEIMAAANhltltktgttttNpttpJAEBhFBAJFsNtlpkttpttNtttlgFAEJIAIEAsF8NFtEotttpNNtpJgBAMEgIlAJoBlNttkstNttNNtpNoJAEAgIEkhkMtJthsstttNNNttkABBBAAlgMEgA9JNpsNptNJtttpskBBFEIIgEEsolhNptttNsFpJttgIggAEAAANEgAtgNttttpttpNptgFBIAAJBAkFgEtAtstltpsJtttsghhpBFkIEEEgAkJNptlNoNttttpgMhoABkEhkEsAlJNstpttMNNNttgpEpABhgBgEoIsJNtttttttNNNsoAhkFFkgkEFoAlhtptNttNpNtphogBoIFsBkFEhAlFtptlttNNtpppogAooNtBkEEhIlBNpNFtpsItNsNgggBAFsplAMpIltNttFNNtN9ttNgEgBAFsBgIJgJNpNtthttsttpsNhAoJgJEFlMgoANpNpNltpthNptNBAgAAFkEgEghANpNptlNtsBtpJJJJAJhBsgAMAEJFJNptFNpstttoNgJAhghtggMElgMNNsNltttMNptNhBAoEAMsAAhBIdtJttttpsJNpkNoIBogAtpgBAlItpNtNtNposNhNJsBgoIkslBAgoBFNpoNFttgiNoMIJBAsIgsIggAEINNNtNNpttgNptNsAAoBggAgAggBFtNttoNtJpNJNJgkgBIhlBgAghsJNJttgttBIhtMJgosoIhsJgAogNlJNptttpNgANsBAAggABoNggogNtJtpttttptBtoBgkhAElIJgBgJNNtNltktttphtNpggAEklJpgIApJNNMtNktttpptsJooAAABJpgIAptJtsENsttttttttsgBAAgNpoAAppptskNklltttttMtABgAAtpkgJJpptkktkhltNJtNstBFJAENpoJJJJptkktklFtNptlssoJBMFtpoFJtJJtkglEkFtJtslMtJtJJNtpsFJNtpoFslEkltJNstNtRPNEtttoFttt/wD/xAAeEQABBAIDAQAAAAAAAAAAAAABEWBwgDBAECBQkP/aAAgBAwEBPxDOEAOiiCjmAQIAAAAAEAAAAAIAgJ3Am+ACAAAgxgEAAAAAAAAUAA2CAAAAABkACQAAAAAAE9sAAAAAAAAAAABhkAAAAAQAAABAAAAAAAIAEAAAAAAACAICOEAAAAEAAACAAEAAgAAAAAAAAAQAACAAAAAASACUvAAAAAAAAAAAAAAAAAAAAAAAAAIAIAAAAAAAIAAAAAAAAAAAAAIAAAAEAAAAAAAQAAAAMAAAAAAAIAAAAAAH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IAAAABAAFHhoAAAAAQABAAAAAAAIAIAABAQQABCAAQEBBAEAwAAAAAACAAAgAgACCAAoACAAAAAAAoAAAAAAAEAAACEAAAAAAAgAAFAQEAAAgGRXACgAABAABAAAIAAABAAAQAYAAECoAAgAAAAAAAEAEABABAAgAAQD0vgAAIwAQAAAAAAAAQAAAAQAQAAAAYAAAAAAAAEEAAABAIF0EAAIABAAAAADAECAQCAAAAAAgAgAwAgACACAMAIAAAIECJVgjAEAQAAAAAAAAAEAAAAQANDAAAAAAAAAEEAAAAAAAABAwAAAgAAAAgAAAAAAgAoAQAABAAAAAIIBIAIAgBAAACAAAACAYAAAAEAQIAAAAoBAAABAAAAAAAAQABAAARpJgABAAAAAQAgAAAAgAGAAIAAAAIAAAAAAEAUAAAAIAQAAAACAgCAIAAAAAAMAAAAIAAAAAAIAgAAIAQAAAAAgAAAAAAAAgAAAAYACACAAIAEAAAADAAMUAAAwAAABAAEAAAACAABACAgYEAIAAAAMAGAAAAAACAAAgAADXAAIFAwBAAAAQAAAAAAgAAAIABgAgAMAAAGAAAIAAAgAAQCAAAABACBgDAAgAAAAAAAEAAB4WoEAAAAABAgCAAAAAAAIAAEAAAAZDwAABACgAAAIAIAAgAQAAAwAACAYAAAAAAEAAgIAAAAwAAAgAAAACCAAAABAAAABACgBAAAAACAIAgAIBAAAAAAEjRAIADAAwAQAAAEAAAwAIAEAAAAAAEAQAAIABAFAUAAAAAAAAAAAAUCCAAAAAAAAAEAAAAgAAACAICAAMAIAAAAAAACAAAAYAIACAAQAQAAAEAIAAAQQAAAG4AMAqwAQAAQACAABCAAECTswAoAMCAAAAAwGAAAICAABACAYAAAACACAGAAAAEACAAMAAAQAABAAIAIBAAEAIAwAACAAwBAQAAAAAAQAAgAAAQAgAIAgAAAEAAAAAAgAgAgAEAAAAQAQAAAAIAEACABAAACAAABAAAoAUAAABQQgAAAACAAKGxgAAAAAIEAYAAIBAQQAAAAIAACBAEAAABAAKAAAAAQAQGAAAGAAAAAAAAAAAAAEAQAoAEAAIAABAAABAIAAAAAAAAAAgABAGAAAAIAAAAAADAAAAAAAACAAAAAAAAACAAAIABAAgAAAAABABQAQABAEAACB4VgCAQAUAAgAAABAACABAwKAAAAAQAQAAAH0xgAAAYAAgAAIBAEAAAAAAAAAIAACAAwAEAAAACAAGAIAAAIAgEAAACAAJ5AAABgAAAAAQQAEAAQACgAYAAIABAAAFAAAAgAAAgAgAICAAEAAAAAAAAgBAAQEABAAAAgBAEAGAEAgAFEAAAAAIANkDIoAEAAQAAAAQANoAKAQAAMAAAAAAAIAAAAAgAgABgAAEAAAIAIACAAAAAAAAAEAQAgCAEAIAAABAAABABAAAAQAAAAAAAAAAAAgIAAAAEAAgCAAQAAAEEAAADAAAIACAQAAGABAAAAFAACCAAQAgAQgAAQICgAgAQEAgAAAKmkAAAUAIAEABAAAAAAAIAABAAAAAAAQAAAEAEAEAAAIBAFAAAAFAAAAgCAIAAICABCAwAAAIABAAAABAAAAAAABABAEAAAQEAAABAgIAAAAAAAAEJoAIAQAIAAAAAAAQAgAAAAKAAUAAIABAAAEAAoAgAYAAQEBAAgACCAACEAQAAAACABAtAQAgACAMCAAEACgAAAEAgCAgAAQCEAAgCA9gCAAgAAAAAAAAQAAAAAAACAgAAAAECAAIAAAQAIAAABAEAAAAAAgMABACAAAAAAABAQAIAYCAAACAIAgAQQEAIBAMAIAgEAAAYDOAABABAEAAAAAwFEAAEAAAACCAIAAEQAAAAAAAAAGBAAAAAAAAIBAgQCQ2gAACAAIAADACACgAAABgAMACAAAIAMAgABAAAAABAAQACABACABiAFAEABAAQAEAQABQIAAB4PAEAQAICAAAAAAABAJAAAAGAQAiAEAAAgGABAAAAAAAAAAAAACAAABAARAYACAFAAAAAAAoAIBCAAAAQAAABAYAAAAgQQAAEBlAACAABAAEAEAQAAAgAAwEDAAAYAQAAAAABAAIAAIAYAIAABAQBAABAEgKCAACbkBAAABgBAAAAgAAQBAAgFABCAQAAAAAACAAAAEAAACAAgUAEAAMAQAAAIAAEAEAAAAAEACkAAAYAAAAAAgAEw+gGAEAAABAAABQAAAwAAABAIAAAAAADACAAACAAAIAQMAAIAIBAAgABAKACADAAAAABAEAAAABAIBQAgABAAgABAAIAMAIQDAIEEAgMisAQAgQCAAAAAAAAwAAAQBQAaagAgAQABACEAAAACABEAAEAABABgAoAAAAAAAAADAAAAAAAAAAQAABAIAgAgAAAEACAABgAAAMAAAMBAAACABQAUQAIAQAUAABAAIAQIAEAwAQAAAgCADAAAAQABAAAAAABJB7BAAwAAAAQAIAEDAAEAAAACAAIAAAAAAgBAQCAAAAAQAAARAAABBAACAGAoAAAIAEAAAAAIAAAAAAYBAAABgIAIAAgAACAJsa4AAIQDAFAgAAACAEBAMAAIAAQCAAAIBAAAAAQCAQIBQQAQAAAEAIAAAAACDAQAwCAQAAAgAAEAIAAACAIAABAAAAEAAApAgAAhAAQBQARAAAAAAAAAAACABAAAAQAABAIAoIAEAAACAAAAAAIDaABAEAAAEAACAQAAEAEACACAIAAAYABBAAAKAQAIAIAAIAgBAEAEAAAAAAAAAAAEGAIMChpoAIAoAMAIAAABAAAAAUAAIAAIAAAAQAQACAAAIAACAAAAAAIAgAQCkAAEAAQACAwAAYAAAgACEAAAAAAAAAAAAAAQBQFAAAADAAAAAAAABAgBAQAAAAABAAAEAAIjOCAEAEIAAAwACAEABAAMAAQCAIQAAAAAQAAAIQBCAEAAAAAAABAIAAAA5ADAQAgBAAAEAABgABAAAQAAAAAADAAgAABAAAACAAAAgEAAAAAAAgAAAAAIEEABAAAIBAAACgAwXwAgAAABAwCAAYAAAAAAABAICgAAAAABAQCAAAwAAQCAIAAJhUAAAAQAACAAAAAAAQIAAAQAAAgCAAAAAAACAACQoAAIGlgGAABAAAAAAAAAABAQGACAAICAAAAABAACABAYACEAAICBAAAAEAAAAAEAAAAgEAAAABgBgAEADAAAABAEABAYAAEAQEAQAACAAoACIEAAAgAAoAIAgD9QFmYAPIEBHcAAEB5oYCGIUCvIEQC5QJNjoABAeAoBKAAQ7kQAAAAMALM5CAHEB6GY+wEYPqAIAEAuwRHD/2Q==);background-size:cover;background-repeat:no-repeat;}.mxRfgTheme text.mxOnBlack.mxLabel,.mxRfgTheme text.mxOnBlack.mxVariation{fill:#fff;stroke:#fff;}.mxRfgTheme text.mxOnWhite.mxLabel,.mxRfgTheme text.mxOnWhite.mxVariation,.mxRfgTheme text.mxOnEmpty.mxLabel,.mxRfgTheme text.mxOnEmpty.mxVariation{fill:#000;stroke:#000;}.mxRfgTheme text.mxVariation.mxOnFocus{fill:#d63641;stroke:#d63641;}.mxRfgTheme rect.mxVariation.mxOnFocus{stroke:none;}.mxRfgTheme .mxMarkOnLast{fill:#d63641;stroke:#d63641;}.mxRfgTheme .mxFocusMark{fill:none;stroke:#d63641;stroke-width:2px;}.mxRfgTheme .mxP:not(:first-child){padding-top:0.5em;}.mxRfgTheme .mxSgfParentDiv{text-align:center;}.mxRfgTheme .mxSgfParentDiv>div{display:inline-block;}.mxRfgTheme.mxCommentConfig .mxCommentDiv,.mxRfgTheme.mxTreeConfig .mxCommentDiv,.mxRfgTheme.mxTreeConfig .mxTreeDiv{height:7em;border:1px solid #ddd;padding:0.25em;overflow:auto;resize:vertical;}.mxRfgTheme.mxTreeConfig .mxTreeDiv svg .mxFocus{fill:#d63641;}.mxRfgTheme.mxTreeConfig .mxTreeDiv{resize:vertical;user-select:none;max-height:42em;margin-top:0.25em;}.mxRfgTheme .mxInnerNotSeenDiv:not(:empty){margin:0.5em auto 0 auto;}.mxRfgTheme .mxInnerNotSeenDiv{margin:0 auto;}.mxRfgTheme .mxNotSeenSvg{width:100%;height:100%;display:block;}.mxRfgTheme.mxGameConfig .mxHeaderDiv{padding-bottom:0.125em;margin-bottom:0.5em;}.mxRfgTheme.mxProblemConfig .mxCommentDiv{margin:0 auto 0.5em auto;text-align:center;border:1px solid transparent;}.mxRfgTheme.mxProblemConfig .mxCommentContentDiv{display:inline-block;text-align:justify;}.mxRfgTheme button[disabled]{opacity:0.3;}.mxRfgTheme .mxGBoxDiv button,.mxRfgTheme .mxSgfParentDiv button{font-size:1em;border:1px solid #ddd;background:transparent;color:#d63641;margin:0.5em 0.125em;padding:0 0.5em;height:1.75em;line-height:1.75em;white-space:nowrap;text-decoration:none;}.mxRfgTheme .mxGBoxDiv button[disabled],.mxRfgTheme .mxSgfParentDiv button[disabled]{color:#000;}.mxRfgTheme input[type=text]{border:1px solid #ddd;text-align:center;}.mxRfgTheme .mxGBoxDiv button:focus,.mxRfgTheme .mxGBoxDiv button:hover,.mxRfgTheme .mxSgfParentDiv button:not([disabled]):focus,.mxRfgTheme .mxSgfParentDiv button:not([disabled]):hover{color:#005580;background:#f5f5f5;}.mxRfgTheme input[type=text]:focus{background:#ffffe0;border:1px solid #849b9f;}.mxRfgTheme .mxGBoxDiv .mxShowContentDiv:focus,.mxRfgTheme.mxCommentConfig .mxCommentDiv:focus,.mxRfgTheme.mxTreeConfig .mxCommentDiv:focus,.mxRfgTheme.mxTreeConfig .mxTreeDiv:focus,.mxRfgTheme.mxProblemConfig .mxCommentDiv:focus{background:#ffffe0;border:1px solid #849b9f;}.mxRfgTheme .mxGBoxDiv{box-sizing:border-box;border:1px solid #ddd;}.mxRfgTheme .mxGBoxDiv .mxShowContentDiv{box-sizing:border-box;position:absolute;top:0;left:0;right:0;bottom:3em;background:#fff;padding:0.25em;overflow:auto;z-index:1;border:1px solid transparent;}.mxRfgTheme .mxOKDiv{box-sizing:border-box;background:#fff;border-top:1px solid #ddd;position:absolute;bottom:0;height:3em;width:100%;max-width:100%;overflow:auto;display:flex;justify-content:center;align-items:center;flex-wrap:wrap;z-index:1;}.mxRfgTheme .mxGBoxDiv.mxShowSgfDiv{font-family:monospace;white-space:pre-wrap;}.mxRfgTheme .mxGBoxDiv.mxShowSgfDiv .mxShowContentDiv{bottom:3.7em;}.mxRfgTheme .mxGBoxDiv.mxShowSgfDiv .mxOKDiv{height:3.7em;}.mxRfgTheme .mxShowOptionDiv{line-height:1.75em;}.mxRfgTheme .mxNumFromTextSpan,.mxRfgTheme .mxNumWithTextSpan{position:relative;left:2em;white-space:nowrap;}.mxRfgTheme .mxNumFromTextSpan:before{content:"\\a";white-space:pre-line;}.mxRfgTheme .mxShowOptionDiv input[type=text]{font-size:1em;}.mxRfgTheme input:not(:checked)~.mxNumFromTextSpan,.mxRfgTheme input:not(:checked)~.mxNumWithTextSpan{display:none;}.mxRfgTheme a{color:#d63641;text-decoration:none;}.mxRfgTheme a:focus{color:#005580;text-decoration:underline;}.mxRfgTheme [data-maxigos-disabled]{opacity:0.5;}.mxRfgTheme .mxNavigationDiv{margin:0 auto;text-align:center;display:flex;justify-content:space-around;align-items:center;}.mxRfgTheme .mxNavigationDiv button{flex:1 1;border:none;background:none;margin:0 2%;padding:0;}.mxRfgTheme .mxNavigationDiv button svg{display:block;max-width:60%;width:100%;height:auto;margin:20% auto;}.mxRfgTheme .mxSolveDiv{padding:1px;text-align:center;}.mxRfgTheme .mxSolveDiv button{border:0;background:none;margin:0.125em 1em;padding:0;width:10%;min-width:40px;height:auto;}.mxRfgTheme .mxSolveDiv button svg{display:block;width:100%;height:100%;}.mxRfgTheme .mxNavigationDiv button:focus rect,.mxRfgTheme .mxNavigationDiv button:focus polygon,.mxRfgTheme .mxSolveDiv button:focus circle,.mxRfgTheme .mxSolveDiv button:focus rect,.mxRfgTheme .mxSolveDiv button:focus path{fill:#d63641;}.mxRfgTheme .mxNavigationDiv input[type=text]{font-size:1em;width:2.4em;height:1.8em;text-align:center;}';
// general
mxG.D[mxG.K].a.in3dOn = 1; // (0,1) default 1
mxG.D[mxG.K].a.htmlParenthesis = 1; // (0,1) default 0
mxG.D[mxG.K].a.allowStringAsSource = 1; // (0,1) default 1
mxG.D[mxG.K].a.allowFileAsSource = 1; // (0,1) default 1
// mxG.D[mxG.K].a.sourceFilter=""; // (str) default ""
mxG.D[mxG.K].a.initMethod = "first"; // ("first","loop","last") default "first"
mxG.D[mxG.K].a.sgfSaveCoreOnly = 1; // (0,1) default 0
// Goban
mxG.D[mxG.K].a.pointsNumMax = 19; // (positive integer) default 0
mxG.D[mxG.K].a.stoneShadowOn = 0; // (0,1) default 0 (require in3dOn=1)
mxG.D[mxG.K].a.stretching = "0,1,1,2"; // (list) default "0,0,1,1"
mxG.D[mxG.K].a.gridPadding = 2; // (float) default 0
mxG.D[mxG.K].a.gridMargin = 0; // (float) default 0
mxG.D[mxG.K].a.gobanPadding = 0; // (float) default 0
mxG.D[mxG.K].a.gobanMargin = 2; // (float) default 0
mxG.D[mxG.K].a.indicesOn = 1; // (0,1,null), default null
mxG.D[mxG.K].a.numberingOn = 0; // (0,1,2,null) default null
mxG.D[mxG.K].a.asInBookOn = 0; // (0,1,null) default null
mxG.D[mxG.K].a.marksAndLabelsOn = 1; // (0,1) default 0
mxG.D[mxG.K].a.markOnLastOn = 1; // (0,1) default 0
mxG.D[mxG.K].a.numAsMarkOnLastOn = 0; // (0,1) default 0 (require markOnLastOn=1)
mxG.D[mxG.K].a.japaneseIndicesOn = 0; // (0,1) default 0 (require indicesOn=1)
mxG.D[mxG.K].a.oldJapaneseIndicesOn = 0; // (0,1) default 0 (require indicesOn=1)
mxG.D[mxG.K].a.eraseGridUnder = 1; // (0,1) default 0
// Comment
mxG.D[mxG.K].a.headerInComment = 1; // (0,1) default 0
mxG.D[mxG.K].a.canCommentFocus = 1; // (0,1) default 0
// Cut
mxG.D[mxG.K].a.cutBtnOn = 1; // (0,1) default 0
// Goto
mxG.D[mxG.K].a.gotoBoxOn = 0; // (0,1) default 0
mxG.D[mxG.K].a.gotoInputOn = 1; // (0,1) default 0
mxG.D[mxG.K].a.gotoInputBefore = "Next"; // (string) default ""
// Header
mxG.D[mxG.K].a.headerBoxOn = 0; // (0,1) default 0
mxG.D[mxG.K].a.headerBtnOn = 0; // (0,1) default 0
mxG.D[mxG.K].a.hideNumOfMoves = 1; // (0,1) default 0
// Option
mxG.D[mxG.K].a.optionBoxOn = 0; // (0,1) default 0
mxG.D[mxG.K].a.optionBtnOn = 1; // (0,1) default 0
// Pass
mxG.D[mxG.K].a.passBtnOn = 1; // (0,1) default 0
// Sgf
mxG.D[mxG.K].a.sgfBtnOn = 1; // (0,1) default 0
mxG.D[mxG.K].a.sgfAction = "download"; // (str) default "show"
// Title
mxG.D[mxG.K].a.titleBoxOn = 0; // (0,1,null) default 0
mxG.D[mxG.K].a.translateTitleOn = 1; // (0,1) default 0
// Tree
mxG.D[mxG.K].a.canTreeFocus = 1; // (0,1) default 0
// Variation
mxG.D[mxG.K].a.variationMarksOn = 1; // (0,1,null) default 0
mxG.D[mxG.K].a.siblingsOn = 0; // (0,1,null) default 0
mxG.D[mxG.K].a.hideSingleVariationMarkOn = 1; // (0,1) default 0
mxG.D[mxG.K].a.variationBoxOn = 0; // (0,1) default 0
mxG.D[mxG.K].a.canPlaceVariation = 1; // (0,1) default 0
mxG.D[mxG.K].start();
