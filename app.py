import os
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
TELEGRAM_CHAT_ID = os.getenv('TELEGRAM_CHAT_ID')

@app.route('/order', methods=['POST'])
def order():
    data = request.get_json()
    cartItems = data.get('cartItems', [])
    paymentMethod = data.get('paymentMethod', '')
    deliveryAddress1 = data.get('deliveryAddress1', '')
    deliveryAddress2 = data.get('deliveryAddress2', '')
    deliveryAddress3 = data.get('deliveryAddress3', '')
    telegramUserId = data.get('telegramUserId', '')

    orderDetails = '\n'.join([f"- {item['title']}: {item['quantity']} x {item['price']}€" for item in cartItems])
    totalAmount = sum(item['price'] * item['quantity'] for item in cartItems)
    message = (
        f"📦 Nouvelle commande de @{telegramUserId}:\n\n{orderDetails}\n\n"
        f"Total: {totalAmount}€\n\n📍 Adresse de livraison :\n{deliveryAddress1}\n"
        f"{deliveryAddress2}\n{deliveryAddress3}\n\n💶 Méthode de paiement : {paymentMethod}"
    )

    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        'chat_id': TELEGRAM_CHAT_ID,
        'text': message,
        'reply_markup': {
            'inline_keyboard': [
                [{'text': 'Valider', 'callback_data': 'validate_order'}, {'text': 'Refuser', 'callback_data': 'reject_order'}]
            ]
        }
    }

    response = requests.post(url, json=payload)
    
    if response.status_code == 200:
        return jsonify({'message': 'Order sent successfully'}), 200
    else:
        return jsonify({'message': 'Error sending order'}), 500

@app.route('/webhook', methods=['POST'])
def webhook():
    data = request.get_json()

    if 'callback_query' in data:
        callback_query = data['callback_query']
        callback_data = callback_query['data']
        chat_id = callback_query['message']['chat']['id']
        message_id = callback_query['message']['message_id']

        if callback_data == 'validate_order':
            message = '✅ Votre commande a été validée.'
        elif callback_data == 'reject_order':
            message = '❌ Votre commande a été refusée.'
        else:
            message = 'Commande non reconnue.'

        url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/editMessageText"
        payload = {
            'chat_id': chat_id,
            'message_id': message_id,
            'text': message
        }

        response = requests.post(url, json=payload)
        return jsonify({'status': 'ok'}), 200

    return jsonify({'status': 'error'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
