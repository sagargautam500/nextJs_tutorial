import PaymentMethodSelector from '@/components/PaymentMethodSelector'

export default function CartPage() {
   //current user
  const currentUser = { id: "671e3a8a7b2d5c4f9bcd1234", email: 'user389@gmail.com' }

  // Example items
  const items = [
    { name: 'Wireless Headphones', price: 200, quantity: 2 },
    { name: 'Bluetooth Speaker', price: 1000, quantity: 1 },
  ]

  // Calculate total price
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Multi-Payment Gateway Ecommerce
          </h1>
          <p className="text-xl text-gray-600">
            Pay with Card, eSewa, Khalti, or ConnectIPS
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Items Display */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Items</h2>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      NPR {(item.price * item.quantity).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">NPR {item.price} each</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">
                  NPR {total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <PaymentMethodSelector items={items} user={currentUser} />
          </div>
        </div>
      </div>
    </main>
  )
}
