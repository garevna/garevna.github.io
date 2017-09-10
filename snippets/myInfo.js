// Info about the author

var params = {
		parent: container,
		backgroundColor: "rgba(255,255,255,0.8)",
		color:"#333",
		border:"inset 1px",
		boxShadow:"inset 3px 3px 10px rgba(0,0,0,0.5)",
		//scrollbarColor: "#aef",
		//backgroundColor:"#ddf",
		mainContentURL: "/text_files/myInfo.txt",
		sides: [
			{
				position: 'left',
				contentType: 'img',
				contentURL: '/images/my_photo_1.jpg'
			},
			{
				position: 'right',
				contentType: 'img',
				contentURL: '/images/authorship_certificate.png'
			},
			{
				position: 'top',
				contentType: 'text',
				contentURL: '/text_files/myInfoTop.txt'
			},
			{
				position: 'bottom',
				contentType: 'text',
				contentURL: '/text_files/myInfoBottom.txt'
			}
		]
	};
	var box = new PerspectiveBoxConstructor ( params );