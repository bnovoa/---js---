<?php

return array(
		'combine' => array(
				/**
				 * publish post
				 * */
				'js/app/mobile/uploader/touch_upload.cmb.js' =>
					array(
							'js/app/mobile/uploader/lib/jpegEncode.js',//pick pic
							'js/app/mobile/uploader/lib/jpegMeta.js',//pick pic
							'js/app/mobile/uploader/lib/photoCompress.js',//pick pic
							'js/app/mobile/uploader/uploader.js',//transmission
							'js/app/mobile/uploader/touch_upload.js'//validate
					),
		),
);
