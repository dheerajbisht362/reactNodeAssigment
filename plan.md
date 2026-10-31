API 1 - 
curl --location 'https://staging.fastor.ai/v1/pwa/user/register' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'phone=9818979450' \
--data-urlencode 'dial_code=+91'
{
    "status": "Success",
    "status_code": 200,
    "data": "otp sent"
}

API 2 - 
curl --location 'https://staging.fastor.ai/v1/pwa/user/login' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'phone=9818979450' \
--data-urlencode 'otp=123456' \
--data-urlencode 'dial_code=+91' \
--data-urlencode '='
{
    "status": "Success",
    "status_code": 200,
    "data": {
        "user_id": "6625",
        "user_name": "asfsdf",
        "user_gender": "M",
        "user_email": "asdfsdf@sdfs.com",
        "dial_code": "+91",
        "user_mobile": "9818979450",
        "member_since": "2024-06-27T17:57:03.000Z",
        "email_verified": false,
        "mobile_verified": true,
        "user_username": null,
        "password": "9818979450",
        "last_password_update": "2024-06-27T17:57:03.000Z",
        "user_source": "PWA",
        "user_image": "https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/profile-pic-male_2fd3e8.svg",
        "dob": null,
        "first_order": true,
        "refer_code": "4idyt16",
        "favorite": null,
        "food_tags": null,
        "workmode": null,
        "country_id": null,
        "last_known_location": [
            {
                "address": "hello world",
                "address2": "jkjasdkfj",
                "pincode": "110018",
                "city_name": "kjaksjdfkj",
                "state_name": "Delhi",
                "country_name": "India",
                "user_name": "asfsdf",
                "user_mobile": "3333333333",
                "user_email": "asdfsdf@sdfs.com",
                "user_gst": "asdfsdf",
                "is_default": true,
                "id": 1,
                "label": "kasjdfkjk, kjaksjdfkj, Delhi, India, 110018",
                "value": 1,
                "source": "POS"
            },
            {
                "id": 2,
                "user_name": "Satbeer asdfasdf",
                "user_mobile": "9818181811",
                "user_email": "satbeer@fastro.ai",
                "user_gst": "",
                "address": "asdfssss",
                "address2": "asdfasdfadd",
                "type": "OFFICE",
                "pincode": "141003",
                "city_name": "asdkfjsk",
                "state_name": "Punjab",
                "country_name": "India",
                "shipping_details": null,
                "is_default": false
            },
            {
                "address": "99",
                "locality": "jkjasdkfj",
                "lat": "0",
                "long": "0",
                "pincode": 248001,
                "city_name": "delhi",
                "state_name": "Delhi",
                "country_name": "India",
                "user_name": "asfsdf",
                "user_mobile": "3333333333",
                "user_email": "asdfsdf@sdfs.com",
                "source": "POS",
                "is_default": false,
                "id": 3,
                "label": "kasjdfkjk, kjaksjdfkj, Delhi, India, 248001",
                "value": 3
            },
            {
                "address": "99",
                "locality": "jkjasdkfj",
                "lat": "0",
                "long": "0",
                "pincode": "110043",
                "city_name": "delhi",
                "state_name": "Delhi",
                "country_name": "India",
                "user_name": "raju",
                "user_mobile": "3333333333",
                "user_email": "asdfsdf@sdfs.com",
                "source": "POS",
                "is_default": false,
                "id": 4,
                "label": "kasjdfkjk, kjaksjdfkj, Delhi, India, 248001",
                "value": 4
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 5
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 6
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 7
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 8
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 9
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 10
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 11
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 12
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 13
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 14
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 15
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 16
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 17
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 18
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 19
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 20
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 21
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 22
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 23
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 24
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 25
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 26
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 27
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 28
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 29
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 30
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 31
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 32
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 33
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 34
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 35
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 36
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 37
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 38
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 39
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 40
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 41
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 42
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 43
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 44
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 45
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 46
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 47
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 48
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 49
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 50
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 51
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 52
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 53
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 54
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 55
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 56
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 57
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 58
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 59
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 60
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 61
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 62
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 63
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 64
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 65
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 66
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 67
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 68
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 69
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 70
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 71
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 72
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 73
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 74
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 75
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 76
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 77
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 78
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 79
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 80
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 81
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 82
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 83
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 84
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 85
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 86
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 87
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 88
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 89
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 90
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 91
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 92
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 93
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 94
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 95
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 96
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 97
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 98
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 99
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 100
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 101
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 102
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 103
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 104
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 105
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 106
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 107
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 108
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 109
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 110
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 111
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 112
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 113
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 114
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 115
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 116
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 117
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 118
            },
            {
                "address": "kasjdfkjk",
                "locality": "jkjasdkfj",
                "lat": "0",
                "long": "0",
                "pincode": 248001,
                "city_name": "kjaksjdfkj",
                "state_name": "Delhi",
                "country_name": "India",
                "user_name": "asfsdf",
                "user_mobile": "3333333333",
                "user_email": "asdfsdf@sdfs.com",
                "source": "POS",
                "is_default": false,
                "id": 119
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 120
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 121
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 122
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 123
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 124
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 125
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 126
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 127
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 128
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 129
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 130
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 131
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 132
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 133
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 134
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 135
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 136
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 137
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 138
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 139
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 140
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 141
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 142
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 143
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 144
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 145
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 146
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 147
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 148
            },
            {
                "pincode": 248001,
                "source": "POS",
                "is_default": false,
                "id": 149
            },
            {
                "address": "kasjdfkjk",
                "locality": "jkjasdkfj",
                "lat": "0",
                "long": "0",
                "pincode": 248001,
                "city_name": "kjaksjdfkj",
                "state_name": "Delhi",
                "country_name": "India",
                "user_name": "asfsdf",
                "user_mobile": "3333333333",
                "user_email": "asdfsdf@sdfs.com",
                "source": "POS",
                "is_default": false,
                "id": 150
            },
            {
                "address": "kasjdfkjk",
                "locality": "jkjasdkfj",
                "lat": "0",
                "long": "0",
                "pincode": 248001,
                "city_name": "kjaksjdfkj",
                "state_name": "Delhi",
                "country_name": "India",
                "user_name": "asfsdf",
                "user_mobile": "3333333333",
                "user_email": "asdfsdf@sdfs.com",
                "source": "POS",
                "is_default": false,
                "id": 151
            },
            {
                "address": "kasjdfkjk",
                "locality": "jkjasdkfj",
                "lat": "0",
                "long": "0",
                "pincode": 110018,
                "city_name": "kjaksjdfkj",
                "state_name": "Delhi",
                "country_name": "India",
                "user_name": "asfsdf",
                "user_mobile": "3333333333",
                "user_email": "asdfsdf@sdfs.com",
                "source": "POS",
                "is_default": false,
                "id": 152
            },
            {
                "address": "kasjdfkjk",
                "locality": "jkjasdkfj",
                "lat": "0",
                "long": "0",
                "pincode": 110018,
                "city_name": "kjaksjdfkj",
                "state_name": "Delhi",
                "country_name": "India",
                "user_name": "asfsdf",
                "user_mobile": "3333333333",
                "user_email": "asdfsdf@sdfs.com",
                "source": "POS",
                "is_default": false,
                "id": 153
            },
            {
                "address": "kasjdfkjk",
                "locality": "jkjasdkfj",
                "lat": "0",
                "long": "0",
                "pincode": 248001,
                "city_name": "kjaksjdfkj",
                "state_name": "Delhi",
                "country_name": "India",
                "user_name": "asfsdf",
                "user_mobile": "3333333333",
                "user_email": "asdfsdf@sdfs.com",
                "source": "POS",
                "is_default": false,
                "id": 154
            },
            {
                "address": "asdfssss",
                "address2": "asdfasdfadd",
                "city_name": "asdkfjsk",
                "state_name": "Punjab",
                "pincode": "141003",
                "user_name": "Satbeer asdfasdf",
                "user_email": "satbeer@fastro.ai",
                "user_mobile": "9818181811",
                "country_name": "India",
                "is_default": false,
                "source": "POS",
                "id": 156
            },
            {
                "address": "hello world",
                "address2": "jkjasdkfj",
                "city_name": "kjaksjdfkj",
                "state_name": "Delhi",
                "pincode": "110018",
                "user_name": "asfsdf",
                "user_email": "asdfsdf@sdfs.com",
                "user_mobile": "3333333333",
                "is_default": false,
                "source": "POS",
                "id": 157
            },
            {
                "user_name": "zczxcz",
                "user_mobile": "9818979450",
                "user_email": "sdfsdf@sdfs.com",
                "address": "skdjfskjf",
                "locality": "sdkfjskdjf",
                "city_name": "sdfsdfj",
                "state_name": "Delhi",
                "pincode": "110019",
                "country_name": "India",
                "is_guest": true
            }
        ],
        "is_b2b": false,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjYyNSIsImVtYWlsIjoiYXNkZnNkZkBzZGZzLmNvbSIsInBob25lIjoiOTgxODk3OTQ1MCIsImRpYWxfY29kZSI6Iis5MSIsImxhc3RfcGFzc3dvcmRfdXBkYXRlIjoiMjAyNC0wNi0yN1QxNzo1NzowMy4wMDBaIiwiaXNfZ3Vlc3QiOmZhbHNlLCJpYXQiOjE3OTMzMzIzNTEsImV4cCI6MTgwMDU4OTk1MX0.j6x3kG0JkOJ7107dJfhRTwBnM1wtJiuvy32L-wEhstU",
        "is_new_user": false
    }
}
API 3 - 
curl --location 'https://staging.fastor.ai/v1/m/restaurant?city_id=118&null=null&=null' \
--header 'Authorization: Bearer {{vault:authorization-secret}}'
{
    "status": "Success",
    "status_code": 200,
    "data": {
        "results": [
            {
                "logo": "https://fastor-d2c-shared-bucket-1.s3.ap-south-1.amazonaws.com/sugandham/uploads/1f4e8121-bda8-4c3b-b46f-a21a9389f276.png",
                "restaurant_name": "VYB",
                "address_complete": "Address, ssasasa, Andhra Pradesh, 110009, India",
                "restaurant_id": "75"
            },
            {
                "logo": "https://fastor-d2c-shared-bucket-1.s3.ap-south-1.amazonaws.com/sugandham/uploads/1f4e8121-bda8-4c3b-b46f-a21a9389f276.png",
                "restaurant_name": "Mother India",
                "address_complete": "KAVERI COMPLEX 2ND FLOOR , BM ROAD HASSAN 573201, Bangalore, Karnataka, 573201, India",
                "restaurant_id": "74"
            },
            {
                "logo": "https://fastor-d2c-shared-bucket-1.s3.ap-south-1.amazonaws.com/sugandham/uploads/1f4e8121-bda8-4c3b-b46f-a21a9389f276.png",
                "restaurant_name": "Dream Carz Pvt. Ltd.",
                "address_complete": "null",
                "restaurant_id": "68"
            },
            {
                "logo": "https://fastor-d2c-shared-bucket-1.s3.ap-south-1.amazonaws.com/sugandham/uploads/1f4e8121-bda8-4c3b-b46f-a21a9389f276.png",
                "restaurant_name": "Fashion India LLP",
                "address_complete": "null",
                "restaurant_id": "67"
            },
            {
                "logo": "https://fastor-d2c-shared-bucket-1.s3.ap-south-1.amazonaws.com/sugandham/uploads/1f4e8121-bda8-4c3b-b46f-a21a9389f276.png",
                "restaurant_name": "Buddy",
                "address_complete": "null",
                "restaurant_id": "66"
            },
            {
                "logo": "https://fastor-d2c-shared-bucket-1.s3.ap-south-1.amazonaws.com/sugandham/uploads/1f4e8121-bda8-4c3b-b46f-a21a9389f276.png",
                "restaurant_name": "Trendwear",
                "address_complete": "null",
                "restaurant_id": "65"
            },
            {
                "logo": "https://fastor-d2c-shared-bucket-1.s3.ap-south-1.amazonaws.com/sugandham/uploads/1f4e8121-bda8-4c3b-b46f-a21a9389f276.png",
                "restaurant_name": "TheBigFoot",
                "address_complete": "null",
                "restaurant_id": "64"
            },
            {
                "logo": "https://fastor-d2c-shared-bucket-1.s3.ap-south-1.amazonaws.com/sugandham/uploads/1f4e8121-bda8-4c3b-b46f-a21a9389f276.png",
                "restaurant_name": "Brand Name",
                "address_complete": "null",
                "restaurant_id": "63"
            },
            {
                "logo": "https://fastor-d2c-shared-bucket-1.s3.ap-south-1.amazonaws.com/sugandham/uploads/1f4e8121-bda8-4c3b-b46f-a21a9389f276.png",
                "restaurant_name": "IndiStylist LLC",
                "address_complete": "null",
                "restaurant_id": "62"
            },
            {
                "logo": "https://fastor-d2c-shared-bucket-1.s3.ap-south-1.amazonaws.com/sugandham/uploads/1f4e8121-bda8-4c3b-b46f-a21a9389f276.png",
                "restaurant_name": "Apple",
                "address_complete": "null",
                "restaurant_id": "61"
            },
            {
                "logo": "https://fastor-d2c-shared-bucket-1.s3.ap-south-1.amazonaws.com/sugandham/uploads/1f4e8121-bda8-4c3b-b46f-a21a9389f276.png",
                "restaurant_name": "Kasaar Consulting",
                "address_complete": "null",
                "restaurant_id": "60"
            },
            {
                "logo": "https://fastor-d2c-shared-bucket-1.s3.ap-south-1.amazonaws.com/sugandham/uploads/1f4e8121-bda8-4c3b-b46f-a21a9389f276.png",
                "restaurant_name": "test",
                "address_complete": "null",
                "restaurant_id": "59"
            },
            {
                "logo": "https://fastor-d2c-shared-bucket-1.s3.ap-south-1.amazonaws.com/sugandham/uploads/1f4e8121-bda8-4c3b-b46f-a21a9389f276.png",
                "restaurant_name": "Apparel India Pvt. Ltd.",
                "address_complete": "null",
                "restaurant_id": "58"
            },
            {
                "logo": "https://d14vymw7cvldyc.cloudfront.net/kidddle-fun/uploads/c8f9912b-8ede-43b1-90da-d4986c28597e.jpeg",
                "restaurant_name": "Kidddle Fun",
                "address_complete": "null",
                "restaurant_id": "57"
            },
            {
                "logo": "https://fastor-d2c-shared-bucket-1.s3.ap-south-1.amazonaws.com/sugandham/uploads/1f4e8121-bda8-4c3b-b46f-a21a9389f276.png",
                "restaurant_name": "Fashionista",
                "address_complete": "null",
                "restaurant_id": "56"
            },
            {
                "logo": "https://fastor-d2c-shared-bucket-1.s3.ap-south-1.amazonaws.com/sugandham/uploads/1f4e8121-bda8-4c3b-b46f-a21a9389f276.png",
                "restaurant_name": "The Indie Stylist",
                "address_complete": "null",
                "restaurant_id": "55"
            },
            {
                "logo": "https://fastor-d2c-shared-bucket-1.s3.ap-south-1.amazonaws.com/sugandham/uploads/1f4e8121-bda8-4c3b-b46f-a21a9389f276.png",
                "restaurant_name": "AWS Beauty",
                "address_complete": "null",
                "restaurant_id": "54"
            },
            {
                "logo": "https://fastor-d2c-shared-bucket-1.s3.ap-south-1.amazonaws.com/sugandham/uploads/1f4e8121-bda8-4c3b-b46f-a21a9389f276.png",
                "restaurant_name": "Indo Armour",
                "address_complete": "null",
                "restaurant_id": "53"
            },
            {
                "logo": "https://fastor-d2c-shared-bucket-1.s3.ap-south-1.amazonaws.com/sugandham/uploads/1f4e8121-bda8-4c3b-b46f-a21a9389f276.png",
                "restaurant_name": "Indo Armour",
                "address_complete": "null",
                "restaurant_id": "52"
            },
            {
                "logo": "https://fastor-d2c-shared-bucket-1.s3.ap-south-1.amazonaws.com/sugandham/uploads/1f4e8121-bda8-4c3b-b46f-a21a9389f276.png",
                "restaurant_name": "Indo Armour",
                "address_complete": "null",
                "restaurant_id": "51"
            }
        ],
        "meta": {
            "total_pages": 3,
            "total_count": 56
        }
    }
}

1