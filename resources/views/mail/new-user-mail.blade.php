<!DOCTYPE html>
<html lang="en">

<head>
    <title>Ranz Coding - Registered User</title>

    <style>
        /* body,
        html {
            height: 100%;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .centered-element {
            padding: 20px;
            background-color: lightcoral;
        } */

        body,
        html {
            height: 100%;
            margin: 0;
            display: grid;
            place-items: center;
        }

        .centered-element {
            padding: 20px;
            width: 50vw;
            margin: auto;
            text-align: center;
            border-radius: 10px;
            background-color: rgba(32, 178, 171, 0.8);
        }
    </style>
</head>

<body>
    <div class="centered-element">
        <h3>{{ $data['title'] }}</h3>
        <p>{{ $data['body'] }}</p>
        <p>Klik <a href="{{ $data['url'] }}">Link</a> ini untuk verifikasi email anda</p>
        <p>
            Terima Kasih, <br>
            Admin
        </p>
    </div>
</body>

</html>