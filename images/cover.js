(function(a){
	var b = '<div id="thickdesk" class="thickdiv" ></div><div class="pop-up"  id="pop-up"><div class="pop_in"><div id="pop-caption" class="caption" ><div id="pop-title" class="text"></div><div class="closebox"><a href="javasctipt:" id="pop-close" title="\u5173\u95ed"></a></div></div><div class="content" id="pop-body"></div></div></div>';
	a.fn.popbox = function(b) {
		b = b || {};
		var d = a.extend({},
		c, b);
		return this.each(function() {
			var c = this.nodeName.toLowerCase();
			"a" === c && d.ajaxTagA ? a(this).click(function() {
				var c = a.trim(a(this).attr("href"));
				if (c && 0 != c.indexOf("javascript:")) if (0 === c.indexOf("#")) a.popbox(a(c), b);
				else {
					a.popbox.loading();
					var d = new Image;
					d.onload = function() {
						var e = d.width,
						f = d.height;
						if (e > 0) {
							var g = a('<img src="' + c + '" width="' + e + '" height="' + f + '" />');
							b.protect = !1,
							a.popbox(g, b)
						}
					},
					d.onerror = function() {
						a.popbox.ajax(c, {},
						b)
					},
					d.src = c
				}
				return ! 1
			}) : a.popbox(a(this), b)
		})
	},
	a.popbox = function(d, e) {
		if (d) {
			var f = a.extend({},
			c, e || {}),
			g = a("#pop-up"),
			h = a("#thickdesk");
			g.size() ? (g.show(), h[f.bg ? "show": "hide"]()) : a("body").append(b),
			"object" == typeof d ? d.show() : d = a(d),
			a.o = {
				s: f,
				ele: d,
				bg: h.size() ? h: a("#thickdesk"),
				out: g.size() ? g: a("#pop-up"),
				tit: a("#pop-title"),
				bar: a("#pop-caption"),
				clo: a("#pop-close"),
				bd: a("#pop-body")
			},
			a.o.tit.html(f.title),
			a.o.clo.html(f.shut),
			a.o.bd.empty().append(d),
			a.isFunction(f.onshow) && f.onshow(),
			a.popbox.setSize(),
			a.popbox.setPosition(),
			f.fix && a.popbox.setFixed(),
			f.drag ? a.popbox.drag() : a(window).resize(function() {
				a.popbox.setPosition()
			}),
			f.bar ? a.popbox.barShow() : a.popbox.barHide(),
			f.bg ? a.popbox.bgShow() : a.popbox.bgHide(),
			f.titleclose ? a.popbox.titleShow() : a.popbox.titleHide(),
			f.btnclose ? a.o.clo.click(function() {
				return a.popbox.hide(),
				!1
			}) : a.popbox.closeBtnHide(),
			f.bgclose && a.popbox.bgClickable(),
			f.delay > 0 && setTimeout(a.popbox.hide, f.delay)
		}
	},
	a.extend(a.popbox, {
		setSize: function() {
			return a.o.bd.size() && a.o.ele.size() && a.o.bd.size() ? (a.o.out.css({
				width: a.o.s.width,
				"height:": a.o.s.height
			}), a.o.out) : void 0
		},
		setPosition: function(b) {
			if (b = b || !1, a.o.bg.size() && a.o.ele.size() && a.o.out.size()) {
				var c = a(window).width(),
				d = a(window).height(),
				e = a(window).scrollTop(),
				f = a(document).height();
				d > f && (f = d),
				a.o.bg.css("opacity", a.o.s.opacity);
				var g = a.o.out.outerHeight(),
				h = a.o.out.outerWidth(),
				i = e + (d - g) / 2,
				j = (c - h) / 2;
				return a.o.s.fix && window.XMLHttpRequest && (i = (d - g) / 2),
				b === !0 ? a.o.out.animate({
					top: i,
					left: j
				}) : a.o.out.css({
					top: i,
					left: j,
					zIndex: a.o.s.index
				}),
				a.o.out
			}
		},
		setFixed: function() {
			return a.o.out && a.o.out.size() ? (window.XMLHttpRequest ? a.popbox.setPosition().css({
				position: "fixed"
			}) : a(window).scroll(function() {
				a.popbox.setPosition()
			}), a.o.out) : void 0
		},
		bgClickable: function() {
			a.o.bg && a.o.bg.size() && a.o.bg.click(function() {
				a.popbox.hide()
			})
		},
		bgHide: function() {
			a.o.bg && a.o.bg.size() && a.o.bg.hide()
		},
		bgShow: function() {
			a.o.bg && a.o.bg.size() ? a.o.bg.show() : a('<div id="thickdesk"></div>').prependTo("body")
		},
		barHide: function() {
			a.o.bar && a.o.bar.size() && a.o.bar.hide()
		},
		barShow: function() {
			a.o.bar && a.o.bar.size() && a.o.bar.show()
		},
		titleHide: function() {
			a.o.tit && a.o.tit.size() && a.o.tit.hide()
		},
		titleShow: function() {
			a.o.tit && a.o.tit.size() && a.o.tit.show()
		},
		closeBtnHide: function() {
			a.o.clo && a.o.clo.size() && a.o.clo.hide()
		},
		hide: function() {
			return a.o.ele && a.o.out.size() && "none" !== a.o.out.css("display") && (a.o.out.fadeOut("fast",
			function() { ! a.o.s.protect || a.o.ele.hasClass("info") && !a.o.ele.attr("id") || a.o.ele.hide().appendTo(a("body")),
				a(this).remove(),
				a.isFunction(a.o.s.onclose) && a.o.s.onclose()
			}), a.o.bg.size() && a.o.bg.fadeOut("fast",
			function() {
				a(this).remove()
			})),
			!1
		},
		drag: function() {
			if (!a.o.out.size() || !a.o.bar.size()) return a(document).unbind("mouseover").unbind("mouseup"),
			void 0;
			var b = a.o.bar,
			c = a.o.out,
			d = !1,
			e = 0,
			f = 0,
			g = c.css("left"),
			h = c.css("top");
			b.mousedown(function(a) {
				d = !0,
				e = a.pageX,
				f = a.pageY
			}).css("cursor", "move"),
			a(document).mousemove(function(a) {
				if (d) {
					var b = a.pageX,
					i = a.pageY,
					j = b - e,
					k = i - f;
					c.css("left", parseInt(g) + j).css("top", parseInt(h) + k)
				}
			}),
			a(document).mouseup(function() {
				d = !1,
				g = c.css("left"),
				h = c.css("top")
			})
		},
		loading: function() {
			var b = a('<div class="info">\u52a0\u8f7d\u4e2d...</div>');
			a.popbox(b, {
				bar: !1
			})
		},
		ask: function(b, c, d, e) {
			var f = a('<div class="info">' + b + '<p><button id="popSubmitBtn" class="submit_btn">\u786e\u8ba4</button>&nbsp;&nbsp;<button id="popCancelBtn" class="cancel_btn">\u53d6\u6d88</button></p></div>');
			a.popbox(f, e),
			a("#popSubmitBtn").click(function() {
				a.isFunction(c) && c.call(this)
			}),
			a("#popCancelBtn").click(function() {
				d && a.isFunction(d) && d.call(this),
				a.popbox.hide()
			})
		},
		remind: function(b, c, d) {
			var e = a('<div class="info">' + b + '<p><button id="popSubmitBtn" class="submit_btn">\u786e\u8ba4</button</p></div>');
			a.popbox(e, d),
			a("#popSubmitBtn").click(function() {
				c && a.isFunction(c) && c.call(this),
				a.popbox.hide()
			})
		},
		ajax: function(b, c, d) {
			b && (a.popbox.loading(), d = d || {},
			d.protect = !1, a.ajax({
				url: b,
				data: c || {},
				success: function(b) {
					a.popbox(b, d)
				},
				error: function() {
					a.popbox.remind("\u52a0\u8f7d\u3002")
				}
			}))
		}
	});
	var c = {
		title: "\u5bf9\u8bdd\u6846",
		shut: "&times;",
		index: 10001,
		opacity: .5,
		width: "auto",
		height: "auto",
		bar: !0,
		bg: !0,
		btnclose: !0,
		titleclose: !0,
		fix: true,
		bgclose: !1,
		drag: !1,
		ajaxTagA: !0,
		protect: "auto",
		onshow: a.noop,
		onclose: a.noop,
		delay: 0
	}
})(jQuery);
