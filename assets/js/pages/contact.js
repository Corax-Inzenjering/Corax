import * as _page from "./page.js";
import * as _mailSender from "../emailSender.js";

window.addEventListener("load", () => { initDefault(); });

function initDefault() {
    _page.scrollHandler.handlePageScrolling();
    _mailSender.initMailSender();
    window["sendMail()"] = _mailSender.sendMail;
}