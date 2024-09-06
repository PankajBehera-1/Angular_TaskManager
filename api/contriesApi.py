from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app

# In-memory storage for countries
countries = []

class Country:
    def __init__(self, country_id, country_name):
        self.country_id = country_id
        self.country_name = country_name

    def to_dict(self):
        return {
            'countryID': self.country_id,
            'CountryName': self.country_name
        }

# Helper function to find a country by ID
def find_country_by_id(country_id):
    for country in countries:
        if country.country_id == country_id:
            return country
    return None

# Pre-populate the countries list with dummy data
def initialize_data():
    global countries
    countries = [
        Country(1, "Afghanistan"),
    Country(2, "Albania"),
    Country(3, "Algeria"),
    Country(4, "Andorra"),
    Country(5, "Angola"),
    Country(6, "Antigua and Barbuda"),
    Country(7, "Argentina"),
    Country(8, "Armenia"),
    Country(9, "Australia"),
    Country(10, "Austria"),
    Country(11, "Azerbaijan"),
    Country(12, "Bahamas"),
    Country(13, "Bahrain"),
    Country(14, "Bangladesh"),
    Country(15, "Barbados"),
    Country(16, "Belarus"),
    Country(17, "Belgium"),
    Country(18, "Belize"),
    Country(19, "Benin"),
    Country(20, "Bhutan"),
    Country(21, "Bolivia"),
    Country(22, "Bosnia and Herzegovina"),
    Country(23, "Botswana"),
    Country(24, "Brazil"),
    Country(25, "Brunei"),
    Country(26, "Bulgaria"),
    Country(27, "Burkina Faso"),
    Country(28, "Burundi"),
    Country(29, "Cabo Verde"),
    Country(30, "Cambodia"),
    Country(31, "Cameroon"),
    Country(32, "Canada"),
    Country(33, "Central African Republic"),
    Country(34, "Chad"),
    Country(35, "Chile"),
    Country(36, "China"),
    Country(37, "Colombia"),
    Country(38, "Comoros"),
    Country(39, "Congo, Democratic Republic of the"),
    Country(40, "Congo, Republic of the"),
    Country(41, "Costa Rica"),
    Country(42, "Croatia"),
    Country(43, "Cuba"),
    Country(44, "Cyprus"),
    Country(45, "Czech Republic"),
    Country(46, "Denmark"),
    Country(47, "Djibouti"),
    Country(48, "Dominica"),
    Country(49, "Dominican Republic"),
    Country(50, "East Timor (Timor-Leste)"),
    Country(51, "Ecuador"),
    Country(52, "Egypt"),
    Country(53, "El Salvador"),
    Country(54, "Equatorial Guinea"),
    Country(55, "Eritrea"),
    Country(56, "Estonia"),
    Country(57, "Eswatini"),
    Country(58, "Ethiopia"),
    Country(59, "Fiji"),
    Country(60, "Finland"),
    Country(61, "France"),
    Country(62, "Gabon"),
    Country(63, "Gambia"),
    Country(64, "Georgia"),
    Country(65, "Germany"),
    Country(66, "Ghana"),
    Country(67, "Greece"),
    Country(68, "Grenada"),
    Country(69, "Guatemala"),
    Country(70, "Guinea"),
    Country(71, "Guinea-Bissau"),
    Country(72, "Guyana"),
    Country(73, "Haiti"),
    Country(74, "Honduras"),
    Country(75, "Hungary"),
    Country(76, "Iceland"),
    Country(77, "India"),
    Country(78, "Indonesia"),
    Country(79, "Iran"),
    Country(80, "Iraq"),
    Country(81, "Ireland"),
    Country(82, "Israel"),
    Country(83, "Italy"),
    Country(84, "Jamaica"),
    Country(85, "Japan"),
    Country(86, "Jordan"),
    Country(87, "Kazakhstan"),
    Country(88, "Kenya"),
    Country(89, "Kiribati"),
    Country(90, "Korea, North"),
    Country(91, "Korea, South"),
    Country(92, "Kosovo"),
    Country(93, "Kuwait"),
    Country(94, "Kyrgyzstan"),
    Country(95, "Laos"),
    Country(96, "Latvia"),
    Country(97, "Lebanon"),
    Country(98, "Lesotho"),
    Country(99, "Liberia"),
    Country(100, "Libya"),
    Country(101, "Liechtenstein"),
    Country(102, "Lithuania"),
    Country(103, "Luxembourg"),
    Country(104, "Madagascar"),
    Country(105, "Malawi"),
    Country(106, "Malaysia"),
    Country(107, "Maldives"),
    Country(108, "Mali"),
    Country(109, "Malta"),
    Country(110, "Marshall Islands"),
    Country(111, "Mauritania"),
    Country(112, "Mauritius"),
    Country(113, "Mexico"),
    Country(114, "Micronesia"),
    Country(115, "Moldova"),
    Country(116, "Monaco"),
    Country(117, "Mongolia"),
    Country(118, "Montenegro"),
    Country(119, "Morocco"),
    Country(120, "Mozambique"),
    Country(121, "Myanmar (Burma)"),
    Country(122, "Namibia"),
    Country(123, "Nauru"),
    Country(124, "Nepal"),
    Country(125, "Netherlands"),
    Country(126, "New Zealand"),
    Country(127, "Nicaragua"),
    Country(128, "Niger"),
    Country(129, "Nigeria"),
    Country(130, "North Macedonia"),
    Country(131, "Norway"),
    Country(132, "Oman"),
    Country(133, "Pakistan"),
    Country(134, "Palau"),
    Country(135, "Panama"),
    Country(136, "Papua New Guinea"),
    Country(137, "Paraguay"),
    Country(138, "Peru"),
    Country(139, "Philippines"),
    Country(140, "Poland"),
    Country(141, "Portugal"),
    Country(142, "Qatar"),
    Country(143, "Romania"),
    Country(144, "Russia"),
    Country(145, "Rwanda"),
    Country(146, "Saint Kitts and Nevis"),
    Country(147, "Saint Lucia"),
    Country(148, "Saint Vincent and the Grenadines"),
    Country(149, "Samoa"),
    Country(150, "San Marino"),
    Country(151, "Sao Tome and Principe"),
    Country(152, "Saudi Arabia"),
    Country(153, "Senegal"),
    Country(154, "Serbia"),
    Country(155, "Seychelles"),
    Country(156, "Sierra Leone"),
    Country(157, "Singapore"),
    Country(158, "Slovakia"),
    Country(159, "Slovenia"),
    Country(160, "Solomon Islands"),
    Country(161, "Somalia"),
    Country(162, "South Africa"),
    Country(163, "South Sudan"),
    Country(164, "Spain"),
    Country(165, "Sri Lanka"),
    Country(166, "Sudan"),
    Country(167, "Suriname"),
    Country(168, "Sweden"),
    Country(169, "Switzerland"),
    Country(170, "Syria"),
    Country(171, "Taiwan"),
    Country(172, "Tajikistan"),
    Country(173, "Tanzania"),
    Country(174, "Thailand"),
    Country(175, "Togo"),
    Country(176, "Tonga"),
    Country(177, "Trinidad and Tobago"),
    Country(178, "Tunisia"),
    Country(179, "Turkey"),
    Country(180, "Turkmenistan"),
    Country(181, "Tuvalu"),
    Country(182, "Uganda"),
    Country(183, "Ukraine"),
    Country(184, "United Arab Emirates"),
    Country(185, "United Kingdom"),
    Country(186, "United States"),
    Country(187, "Uruguay"),
    Country(188, "Uzbekistan"),
    Country(189, "Vanuatu"),
    Country(190, "Vatican City"),
    Country(191, "Venezuela"),
    Country(192, "Vietnam"),
    Country(193, "Yemen"),
    Country(194, "Zambia"),
    Country(195, "Zimbabwe")
    ]

# Get all countries
@app.route('/countries', methods=['GET'])
def get_countries():
    return jsonify([country.to_dict() for country in countries])

# Create a country
@app.route('/countries', methods=['POST'])
def create_country():
    data = request.get_json()
    country_id = data.get('countryID')
    country_name = data.get('CountryName')

    if find_country_by_id(country_id):
        return jsonify({'error': 'Country with this ID already exists'}), 400

    new_country = Country(country_id, country_name)
    countries.append(new_country)
    return jsonify(new_country.to_dict()), 201

# Get a country by ID
@app.route('/countries/<int:country_id>', methods=['GET'])
def get_country(country_id):
    country = find_country_by_id(country_id)
    if country is None:
        return jsonify({'error': 'Country not found'}), 404
    return jsonify(country.to_dict())

# Update a country by ID
@app.route('/countries/<int:country_id>', methods=['PUT'])
def update_country(country_id):
    data = request.get_json()
    country_name = data.get('CountryName')

    country = find_country_by_id(country_id)
    if country is None:
        return jsonify({'error': 'Country not found'}), 404

    country.country_name = country_name
    return jsonify(country.to_dict())

# Delete a country by ID
@app.route('/countries/<int:country_id>', methods=['DELETE'])
def delete_country(country_id):
    global countries
    countries = [country for country in countries if country.country_id != country_id]
    return jsonify({'result': 'Country deleted'})

if __name__ == '__main__':
    initialize_data()  # Populate initial data
    app.run(debug=True, port=5006)
