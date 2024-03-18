var paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AQcGMdaTh-YKGwpk4bLGnTk04qeMWZyySMPQQBH2_l2hRrCgvuzyTPhJ_HET58sJRrhkzwRdJYSHlwUr",
  client_secret:
    "EHSXI09OXlMBy3dramohDlDXzqx2fi2cGzI78A-7zkjkztvLZINCadfmjfQANk5eYOm4wLDdfG9jir6u",
});

const paymentController = {
  create: async (req, res, next) => {
    const products = Object.values(req.body.cart).flat(1);
    const totalPrice = products.reduce(
      (sum, product) => sum + product.quantity * product.discountPrice,
      0
    );
    const items = products.map((product) => {
      return {
        name: product.name,
        price: product.discountPrice,
        currency: "USD",
        quantity: product.quantity,
      };
    });

    var create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: 'http://localhost:3000/order/success',
        cancel_url: "http://cancel.url",
      },
      transactions: [
        {
          item_list: {
            items: items,
          },
          amount: {
            currency: "USD",
            total: totalPrice,
          },
          description: "This is the payment description.",
        },
      ],
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        next(error);
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel == "approval_url") {
            return res.json({link: payment.links[i].href, total: totalPrice});
          }
        }
      }
    });
  },

  success: async(req, res, next) => {
    const total = req.body.total;
    const payerId = req.body.PayerID;
    const paymentId = req.body.paymentId;
    console.log(req.body);

    const execute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: "USD",
            "total": total
          },
        },
      ],
    };
    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function (error, payment) {
        if (error) {
          next(error)
        } else {
          console.log(payment);
          return res.json(true);
        }
      }
    );
  },
};

module.exports = paymentController;
