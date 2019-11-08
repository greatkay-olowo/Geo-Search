// Share on facebook

const facebookShare = document.querySelector('[data-js="facebook-share"]');

facebookShare.addEventListener("click", e => {
	e.preventDefault();
	let facebookWindow = window.open(
		"https://www.facebook.com/sharer/sharer.php?u=" + document.URL,
		"facebook-popup",
		"height=300,width=600",
	);
	if (facebookWindow.focus) {
		facebookWindow.focus();
	}
	return false;
});
