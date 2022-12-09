function slideInDrops() {
  if (dropController) {
    var e = dropController.xIndex * dropController.dropWidth + 100,
      t = dropCanvasHolder.innerWidth() - dropCanvasHolder.width();
    TweenMax.from(dropCanvasHolder, 3, {
      x: -e - t,
      onStart: function () {
        dropCanvasHolder.addClass("canvasReady"),
          (dropController.hidden = !1),
          dropController.render();
      },
      ease: Power2.easeOut,
    });
  }
}
function autoDrop() {
  dropController.addDrop(), setTimeout(autoDrop, 3e3 * Math.random());
}
function resize() {
  if (!body.hasClass("keyboard-visible")) {
    dropController && dropController.resize(),
      adjustSlideDimensions(),
      fitLine();
    for (var e in scenes) {
      var t = getScrollHeight(scenes[e].triggerElement());
      scenes[e].duration(t);
    }
  }
}
function adjustSlideDimensions() {
  slides.height($(window).innerHeight());
}
function fitLine() {
  $("#Home .content").addClass("fitting"),
    textFit($(".supports.line").get(0), { widthOnly: !0 }),
    $(".adjustText").css(
      "font-size",
      $(".supports.line").find(".second").css("font-size")
    ),
    $("#Home .content").removeClass("fitting");
}
function getScrollHeight(e) {
  var t = e.find(".step").size() + 1;
  return $(window).innerHeight() * t;
}
function initScrollControls() {
  (controller = new ScrollMagic({
    container: scrollContainer,
    globalSceneOptions: { triggerHook: "onLeave", offset: 1 },
  })),
    (scenes.Home = new ScrollScene({
      triggerElement: slides.first(),
      duration: 0,
    })
      .setPin(slides.first())
      .on("enter leave", navigateScene)
      .on("end", function () {
        slides.first().addClass("stayWhereYouAre");
      })
      .on("start", function () {
        slides.removeClass("stayWhereYouAre");
      })
      .addTo(controller)),
    slides
      .not(slides.first())
      .not(".hidden")
      .not("#Formular")
      .each(function (e, t) {
        var n = addSlideAnimations(e, t);
        scenes[t.id] = n;
      }),
    (scenes.Formular = new ScrollScene({
      triggerElement: $("#Formular"),
      duration: 0,
    })
      .on("enter leave", navigateScene)
      .addTo(controller));
}
function addSlideAnimations(e, t) {
  var n = 0.7,
    o = $(t),
    i = new TimelineMax(),
    r = new ScrollScene({ triggerElement: o, duration: getScrollHeight(o) });
  return (
    addStepAnimations(o, i),
    i.add(TweenMax.from(o.find("defs").first(), n, {})),
    r
      .setTween(i)
      .setPin(o)
      .on("enter leave", navigateScene)
      .on("end", function () {
        o.addClass("stayWhereYouAre");
      })
      .on("start", function () {
        slides.removeClass("stayWhereYouAre");
      })
      .addTo(controller),
    r
  );
}
function debugEvents(e) {
  e.on("progress start end enter leave", function (e) {
    console.log(
      e.target.triggerElement().attr("id"),
      e.type,
      e.scrollDirection
    );
  });
}
function navigateScene(e) {
  var t = e.target.getPin() || $("#Formular");
  switch (e.type) {
    case "leave":
      if ("FORWARD" === e.scrollDirection) {
        var n = t.parent().next().find(".slide");
        updateMenuColor(n.attr("id")), onNavigateTo(n.attr("id"));
      } else unmarkPreviouse(t);
      break;
    case "enter":
      "REVERSE" === e.scrollDirection
        ? (updateMenuColor(t.attr("id")), onNavigateTo(t.attr("id")))
        : markPreviouse(t);
  }
}
function markPreviouse(e) {
  e.parent().prev().find(".slide").addClass("visited");
}
function unmarkPreviouse(e) {
  e.parent().prev().find(".slide").removeClass("visited");
}
function addStepAnimations(e, t) {
  for (
    var n,
      o = buntsteps[e.attr("id")],
      i = e.find(".step"),
      r = Math.max(Object.size(o), i.size()),
      a = 0;
    r > a;
    a++
  ) {
    var s = [],
      l = i.eq(a),
      d = "step-" + a;
    if (
      (0 === a &&
        e.find(".svg-container").size() &&
        s.push(
          TweenMax.from(e.find("svg"), 1, {
            css: { transform: "scale(0.5)", autoAlpha: 0 },
            ease: Circ.easeInOut,
          })
        ),
      l)
    ) {
      var c = new TimelineMax(),
        u = [
          TweenMax.from(l.find(".text"), 1, {
            css: { transform: "translateY(30px)", autoAlpha: 0 },
          }),
        ];
      n &&
        (u.push(TweenMax.to(n.find(".text"), 0.5, { autoAlpha: 0 })),
        c.delay(1)),
        addAnimations(o, d, e, u),
        c.add(u),
        s.push(c);
    } else addAnimations(o, d, e, s);
    (n = l), t.add(s);
  }
}
function addAnimations(e, t, n, o) {
  if (e && e[t])
    for (var i in e[t]) {
      var r = e[t][i].direction || "from",
        a = e[t][i].duration || 1;
      (e[t][i].forceRedraw || e[t][i].forceRedrawSafari) &&
        ((isSafari || e[t][i].forceRedraw) &&
          ((e[t][i].onUpdate = function (e) {
            var t = e.find("svg").get(0);
            (t.style.display = "none"),
              t.offsetHeight,
              (t.style.display = "block");
          }),
          (e[t][i].onUpdateParams = [n])),
        delete e[t][i].forceRedraw,
        e[t][i].forceRedrawSafari && delete e[t][i].forceRedrawSafari),
        o.push(TweenMax[r](n.find(i), a, e[t][i]));
    }
}
function addTouchSupport() {
  0 != window.scrollY && window.scrollTo(0, 0),
    (myScroll = new IScroll(".scroll-container", {
      scrollX: !1,
      scrollY: !0,
      scrollbars: !0,
      useTransform: !1,
      useTransition: !1,
      probeType: 3,
      tap: !0,
    })),
    controller.scrollPos(function () {
      return -myScroll.y;
    }),
    myScroll.on("scroll", function () {
      controller.update();
    }),
    document.addEventListener(
      "touchmove",
      function (e) {
        e.preventDefault();
      },
      !1
    ),
    body.on({
      "lightbox-open": function () {
        myScroll.disable(),
          $(activeLightboxId + " .content").on(
            "touchstart touchmove",
            function (e) {
              e.stopPropagation();
            }
          );
      },
      "lightbox-close": function () {
        $(activeLightboxId + " .content").off("touchstart"), myScroll.enable();
      },
    });
}
function initLightbox() {
  $(".lightboxLink").on("click tap", showLightbox),
    $(".lightbox .closeBtn").on("click tap", hideLightbox),
    $(".lightbox .background").on("click tap", hideLightbox),
    $(".lightbox .target.button").on("click tap", hideLightbox),
    $(document).keyup(function (e) {
      27 == e.keyCode && hideLightbox();
    });
}
function showLightbox(e, t) {
  e && e.preventDefault();
  var t = t || this.hash;
  return activeLightboxId === t
    ? void hideLightbox()
    : (activeLightboxId && hideLightbox(null, !0),
      (activeLightboxId = t),
      $(activeLightboxId).addClass("active"),
      body.addClass("mode-lightbox"),
      void body.trigger("lightbox-open"));
}
function hideLightbox(e, t) {
  $(activeLightboxId).removeClass("active"),
    t || (body.removeClass("mode-lightbox"), body.trigger("lightbox-close")),
    (activeLightboxId = null);
}
function initNavigation() {
  $(".navigation a")
    .on("click", function (e) {
      e.preventDefault();
      var t = $($(this).attr("href"));
      scrollToSlide(t);
    })
    .each(function (e, t) {
      var n = $(t).find("svg").get(0);
      n && (navigationDrops[t.hash] = Snap(n).select(".drop"));
    }),
    $(".target.button").on("click tap", function () {
      scrollToSlide($($(this).data("target")));
    }),
    nextSlideButtons.on("click tap", function () {
      var e = $(this).parents(".scrollmagic-pin-spacer");
      scrollToSlide(e.next().find(".slide"));
    }),
    $(".facebook.share").on("click tap", function () {
      (facebookShareData.method = "feed"), FB.ui(facebookShareData);
    });
}
function onNavigateTo(e) {
  var t = $(".navigation a[href=#" + e + "]"),
    n = $(".navigation a.current");
  switch (e) {
    case "Weiss":
    case "Violett":
      $(".partners").addClass("mobile-visible");
      break;
    case "CTA":
    case "Home":
      $(".partners").removeClass("mobile-visible");
  }
  n.size() &&
    (n.removeClass("current"),
    animateDrop(navigationDrops[n.get(0).hash], "inactive", mina.easein)),
    t.size() &&
      (t.addClass("current"),
      animateDrop(navigationDrops[t.get(0).hash], "active", mina.easeout),
      navigationArrowTween && navigationArrowTween.kill(),
      (navigationArrowTween = TweenMax.to(navigationArrow, 0.5, {
        y: t.get(0).offsetTop,
        ease: Power2.easeOut,
      })));
}
function updateMenuColor(e) {
  e &&
    (buntsteps[e] && buntsteps[e]["dark-menu"]
      ? blackAndWhite.addClass("dark")
      : blackAndWhite.removeClass("dark"));
}
function animateDrop(e, t, n) {
  e && e.animate({ d: e.attr("data-" + t) }, dropMorphSpeed, n);
}
function scrollToSlide(e) {
  var t = scenes[e.attr("id")].triggerOffset();
  switch (e.attr("id")) {
    case "Formular":
      setTimeout(onNavigateTo, 1e3, "Formular");
      break;
    case "Home":
      t = 0;
      break;
    default:
      t += $(window).innerHeight();
  }
  $(scrollContainer).scrollTop() !== t && scrollToOffset(t);
}
function scrollToOffset(e) {
  myScroll
    ? myScroll.scrollTo(0, -e, 1e3)
    : isSafari
    ? scrollContainer.scrollTop(e)
    : TweenMax.to(scrollContainer, 1, { scrollTo: { y: e } });
}
function initForm() {
  $("#public").on("change", checkBox),
    $(".error .closeBtn").on("click tap", closeError),
    $("body").on("tap", function (e) {
      $(e.target).is(":input") || $("form input").blur();
    }),
    $("form :input").on("blur", function () {
      $(this).addClass("blur");
    }),
    $("form")
      .on("submit", submitForm)
      .on(
        {
          focus: function () {
            makeSureThatFormIsVisible(), body.addClass("keyboard-visible");
          },
          blur: function () {
            body.removeClass("keyboard-visible");
          },
        },
        "input[type=text], input[type=email], input[type=postalcode], textarea"
      );
}
function setupChangeDotOrg() {
  (ChangeOrgApiUtils.proxy = changeOptions.proxy),
    (client = new ChangeOrgApiClient(changeOptions)),
    (petition = new ChangeOrgApiPetition(client));
}
function makeSureThatFormIsVisible() {
  Modernizr.touch || scrollToSlide($("#Formular"));
}
function showError(e) {
  var t = {
    validation: ".mandatory_field_error",
    petition: ".change_dot_org_error",
  };
  enableForm(),
    $(t[e] + ".message").removeClass("hidden"),
    $("form input").one("input", closeError);
}
function closeError() {
  $(".error .message").addClass("hidden");
}
function validateForm() {
  var e = !0;
  return (
    $(":required").each(function (t, n) {
      "" == $(n).val() && (e = !1);
    }),
    e
  );
}
function submitForm(e) {
  return (
    e && e.preventDefault(),
    validateForm()
      ? ($(this).find("input").addClass("blur"),
        closeError(),
        disableForm(),
        sign(changeOptions.auth_key),
        void (formErrorTimeout = setTimeout(function () {
          showError("petition");
        }, 1e4)))
      : (showError("validation"), !1)
  );
}
function authAndSign() {
  var e = petition.getAuthorization();
  e
    .setPetitionId(changeOptions.petition_id)
    .setRequesterEmail($("#email").val())
    .setSource("buntspenden.de")
    .setSourceDescription(changeOptions.description)
    .setFollowupFlag(!0)
    .setCallback(function (e) {
      "granted" == e.getData("status")
        ? sign(e.getData("auth_key"))
        : (showError("petition"), console.error(e.getData()));
    }),
    e.authorize();
}
function sign(e) {
  petition.addSignature(
    {
      petition_id: changeOptions.petition_id,
      auth_key: e,
      source: "buntspenden.de",
      email: $("#email").val(),
      first_name: $("#first_name").val(),
      last_name: $("#last_name").val(),
      postal_code: $("#postal_code").val(),
      city: $("#city").val(),
      country_code: "DE",
      reason: $("#reason").val(),
      hidden: !$("#public").prop("checked"),
    },
    onPetitionResponse
  );
}
function prefillForm() {
  $("#email").val("gustav@germancreative.com"),
    $("#first_name").val("Gustav"),
    $("#last_name").val("Hellner"),
    $("#city").val("Berlin"),
    $("#postal_code").val("10119");
}
function onPetitionResponse(e) {
  "success" == e.getData("result")
    ? onSuccesfulSign()
    : (showError("petition"), console.error(e.getData("messages")));
}
function disableForm() {
  var e = $(".submit.button");
  e.find("input").prop("disabled", !0),
    e.find(".loader").spin({ lines: 11, width: 2, length: 4, radius: 3 }),
    TweenMax.to(e.find("input"), 0.5, { marginRight: 35 }),
    TweenMax.fromTo(
      e.find(".loader"),
      0.5,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1 }
    );
}
function enableForm() {
  var e = $(".submit.button");
  e.find("input").prop("disabled", !1),
    TweenMax.to(e.find("input"), 0.5, { marginRight: 0 }),
    TweenMax.to(e.find(".loader"), 0.5, {
      opacity: 0,
      scale: 0.5,
      onComplete: function () {
        e.find(".loader").spin(!1);
      },
    });
}
function onSuccesfulSign() {
  var e = $("#Danke");
  enableForm(),
    clearTimeout(formErrorTimeout),
    e.removeClass("hidden"),
    $(".new-signature-name").text($("#first_name").val()),
    (scenes.Danke = new ScrollScene({
      triggerElement: $("#Formular"),
      duration: 0,
    })
      .setPin(e)
      .on("enter leave", navigateScene)
      .addTo(controller)),
    Modernizr.touch
      ? window.scrollTo(0, scenes.Formular.triggerOffset())
      : scrollContainer.scrollTop(scenes.Formular.triggerOffset()),
    setTimeout(function () {
      scrollToSlide(e), myScroll.refresh();
    }, 0);
}
function checkBox() {
  var e = $(this).parents("label").find("svg"),
    t = e.find("path");
  this.checked
    ? window.navigator.userAgent.indexOf("MSIE ") > 0
      ? t.css("strokeDashoffset", 0)
      : TweenMax.to(t, 0.2, { strokeDashoffset: 0, ease: Power1.easeInOut })
    : t.css("strokeDashoffset", t.attr("data-dashlength"));
}
function loadSignatures() {
  setupChangeDotOrg(),
    petition.getSignatures(
      {
        petition_id: changeOptions.petition_id,
        page_size: 4,
        sort: "time_desc",
      },
      function (e) {
        e._data &&
          ((signatures = e.getData("signatures")),
          (signatureCount = parseInt(e.getData("signature_count")))),
          (dropController = new drops({
            holder: dropCanvasHolder,
            canvas: dropCanvas,
            initial: 2 * signatureCount,
            amount: signatureTarget,
            hidden: !0,
          })),
          slideInDrops(),
          TweenMax.to($(".counter"), 3, { opacity: 1 }),
          $(".odometer").text(signatureCount),
          startAnimation();
      }
    );
}
function pollSignatures() {
  petition.getSignatures(
    {
      petition_id: changeOptions.petition_id,
      page_size: 10,
      sort: "time_desc",
    },
    addRecentSignatures
  ),
    setTimeout(pollSignatures, signaturePollIntervall);
}
function addRecentSignatures(e) {
  if (!e._data) return void console.error("no API response");
  var t = e.getData("signatures"),
    n = signatureIndex(lastSignature, t);
  if (n > 0) {
    var o = t.slice(0, n);
    signatures = o.concat(signatures);
  }
}
function signatureIndex(e, t) {
  if (e)
    for (var n = 0; n < t.length; n++)
      if (t[n].name == e.name && t[n].city == e.city) return n;
  return t.length;
}
function startAnimation() {
  var e = 0,
    t = (signatureTarget - signatureCount).toString();
  (t = t.replace(/\B(?=(\d{3})+(?!\d))/g, ".")),
    $(".missing-signatures").text(t),
    displaySignature(signatures.pop()),
    setTimeout(function () {
      $(".counter.text").addClass("hidden"),
        $(".supports.text").removeClass("hidden");
    }, (e += 4e3));
  for (var n = 0, o = signatures.length; o > n; n++)
    setTimeout(displaySignature, (e += signatureScreenTime), signatures.pop());
  setTimeout(function () {
    $(".supports.text").addClass("hidden"),
      $(".call.text").removeClass("hidden");
  }, (e += signatureScreenTime + 1e3));
}
function workOfSignaturesQueue() {
  displaySignature(signatures.pop()),
    setTimeout(workOfSignaturesQueue, signatureScreenTime);
}
function displaySignature(e) {
  if (e) {
    lastSignature = e;
    var t = e.city;
    t || (e.country_code && (t = countries[language][e.country_code])),
      $(".signature-name").text(e.name.split(" ")[0]),
      $(".signature-city").text(t),
      dropController.addDrop();
  }
}
function successAnimation() {
  setTimeout(function () {
    $(".done-call").removeClass("hidden").find(".second").text(weDidIt),
      $(".counter.text").addClass("hidden");
  }, 4e3),
    setTimeout(function () {
      $(".done-call").addClass("hidden"),
        $(".supports.text").removeClass("hidden"),
        pollSignatures(),
        setTimeout(workOfSignaturesQueue, signatureScreenTime);
    }, 4e3 + signatureScreenTime);
}
function init() {
  return (
    adjustSlideDimensions(),
    fitLine(),
    bannerMode
      ? void $(window).on({ resize: resize, load: loadSignatures })
      : (initScrollControls(),
        initLightbox(),
        initNavigation(),
        initForm(),
        void $(window).on({ resize: resize, load: loaded }))
  );
}
function loaded() {
  Modernizr.touch &&
    (FastClick.attach(document.body), setTimeout(addTouchSupport, 200)),
    Modernizr.pointerevents ||
      slides.on("mousewheel DOMMouseScroll", function (e) {
        scrollContainer.scrollTop(
          scrollContainer.scrollTop() -
            (e.originalEvent.wheelDelta || 10 * -e.originalEvent.detail)
        );
      }),
    loadSignatures();
}
var body = $("body"),
  slides = $(".slide"),
  dropCanvas = $(".drops"),
  dropCanvasHolder = $(".stripe.red"),
  blackAndWhite = $(".blackAndWhite"),
  dropController,
  scrollScene,
  container = $(".container"),
  scrollContainer = $(Modernizr.touch ? ".scroll-container" : window),
  navigationArrow = $(".navigation .arrow"),
  nextSlideButtons = $(".next.button"),
  activeLightboxId,
  controller,
  navigationDrops = {},
  dropMorphSpeed = 500,
  scenes = {},
  myScroll,
  navigationArrowTween,
  client,
  petition,
  formErrorTimeout,
  signatures = [
    {
      name: "Eckhard H. Dr. Pfeifer",
      city: null,
      state_province: null,
      country_code: "DE",
      country_name: "Deutschland",
      signed_at: "2014-10-29T11:33:51Z",
    },
    {
      name: "Susanne Hausstein",
      city: null,
      state_province: null,
      country_code: "DE",
      country_name: "Deutschland",
      signed_at: "2014-10-29T11:17:55Z",
    },
    {
      name: "Mario Polzin",
      city: null,
      state_province: null,
      country_code: "DE",
      country_name: "Deutschland",
      signed_at: "2014-10-29T10:50:51Z",
    },
    {
      name: "Virginia Schmidt",
      city: null,
      state_province: null,
      country_code: "DE",
      country_name: "Deutschland",
      signed_at: "2014-10-29T00:02:58Z",
    },
  ],
  lastSignature = null,
  signatureTarget = 5e4,
  signatureCount = 28761,
  signatureScreenTime = 2e3,
  signaturePollIntervall = 1e4,
  bannerMode = $("html").hasClass("banner"),
  isSafari =
    -1 != navigator.userAgent.indexOf("Safari") &&
    -1 == navigator.userAgent.indexOf("Chrome");
(Object.size = function (e) {
  var t,
    n = 0;
  for (t in e) e.hasOwnProperty(t) && n++;
  return n;
}),
  $(document).ready(init);
