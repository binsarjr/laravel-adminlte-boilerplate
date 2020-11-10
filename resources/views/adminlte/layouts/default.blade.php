<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>@yield('title')</title>
	<!-- Tell the browser to be responsive to screen width -->
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<!-- Ionicons -->
	<link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
	<!-- Google Font: Source Sans Pro -->
	<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
	<link rel="stylesheet" href="{{ mix('dist/css/adminlte.css') }}">
</head>
<body class="hold-transition @yield('body-class','login-page')">
	@yield('body')
	<!-- /.login-box -->

	@include('script')
	<script src="{{ mix('dist/js/adminlte.js') }}"></script>
</body>

</html>