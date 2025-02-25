import Order from "../models/Order.js";

class DashboardsController {
    async getOrders(req, res) {
        try {
            let { page = 1, limit = 6 } = req.query;
            page = parseInt(page);
            limit = parseInt(limit);
            
            //aggregation para os cards
            const aggregationPipeline = [
                {
                    $match: {}  
                },
                {
                    $group: {
                        _id: null,
                        orders_total: { $sum: { $ifNull: ["$payment.amount", 0] } },
                        sales_total: {
                            $sum: {
                                $cond: [{ $eq: ["$payment.status", "succeeded"] }, "$payment.amount", 0]
                            }
                        },
                        sales_count: {
                            $sum: {
                                $cond: [{ $eq: ["$payment.status", "succeeded"] }, 1, 0]
                            }
                        },
                        orders_count: { $sum: 1 }
                    }
                }
            ];

            const aggregationResult = await Order.aggregate(aggregationPipeline);
            const orders_total = aggregationResult[0]?.orders_total || 0;
            const sales_total = aggregationResult[0]?.sales_total || 0;
            const orders_count = aggregationResult[0]?.orders_count || 0;
            const sales_count = aggregationResult[0]?.sales_count || 0;
            const average_ticket = sales_count > 0 ? sales_total / sales_count : 0;

            //paginação
            const total = await Order.countDocuments();
            const total_pages = Math.ceil(total / limit);
            const has_more = page < total_pages;

            const orders = await Order.find({})
                .skip((page - 1) * limit)
                .limit(limit);

            return res.status(200).json({
                orders_total: orders_total,
                orders_count: orders_count,
                sales_total: sales_total,
                sales_count: sales_count,
                average_ticket: average_ticket,
                has_more,
                limit,
                total_pages,
                page,
                total,
                orders: orders,
            });

        } catch (error) {
            return res.status(500).json({
                error: true,
                message: 'Ops! Ocorreu um erro em nosso servidor. Por favor, tente novamente ou contate o suporte.'
            });
        }
    }
}

export default new DashboardsController();