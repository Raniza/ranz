<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="shortcut icon" href="{{ asset('ranz2.png') }}" type="image/x-icon">

    <link rel="stylesheet" href="{{ asset('summernote\summernote-lite.min.css') }}">

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

    <script src="{{ asset('summernote\summernote-lite.min.js') }}"></script>


    @viteReactRefresh
    @vite('resources/js/app.jsx')

    <title>Ranz</title>

    @inertiaHead
</head>

<body>
    @inertia
</body>

</html>