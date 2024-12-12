import React from 'react'
import BlogCard from '../components/BlogCard';

function BlogList() {
  const blogs = [
    {
      id:1,
      image: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1vp9VO.img?w=768&h=415&m=6',
      title: 'Walmart',
      content: `Walmart Inc, Amazon.com and fast-growing ecommerce sites Shein and PDD Holding's Temu saw record-breaking sales on Black Friday and Cyber Monday, according to spending data, suggesting that they may finish the holiday season on a much stronger note than Target and Best Buy, which struggled.
      
      Walmart Inc, Amazon.com and fast-growing ecommerce sites Shein and PDD Holding's Temu saw record-breaking sales on Black Friday and Cyber Monday, according to spending data, suggesting that they may finish the holiday season on a much stronger note than Target and Best Buy, which struggled.`,
      author: 'John Doe',
      date: 'Dec 7, 2024',
    },
    {
      id:2,
      image: 'https://img.etimg.com/thumb/msid-111368309,width-650,height-488,imgsize-967923,resizemode-75/ola-electric.jpg',
      title: "Inside Ola's Gigafactory",
      content: `These cells are more energy-efficient and are set to significantly reduce the company's dependency on imported components, particularly from South Korea. Ola Gigafactory, which is currently conducting trial production of battery cells for electric two-wheelers in Tamil Nadu, is expected to start commercial production by the beginning of next year, Ola Electric Mobility Ltd officials visiting Ahmedabad said Tuesday. These indigenous cells not only carry five times the energy compared to their imported counterparts from South Korea, but are also expected to help Ola scale down on imports.

      Who is the PayPal Mafia? In 1998, a trio of visionaries—Max Levchin, Peter Thiel, and Luke Nosek—launched Fieldlink, which would soon be reborn as Confinity. Initially, their sights were set on developing cutting-edge security software for handheld devices. But as the digital landscape evolved, so did they, transforming into a pioneering digital wallet that would ultimately revolutionise online payments. The game changed dramatically when Confinity merged with X.com, a venture by Ed Ho, Elon Musk, Harris Fricker, and Christopher Payne.`,
      author: 'Jane Smith',
      date: 'Nov 25, 2024',
    },
    {
      id:3,
      image: 'https://images.yourstory.com/cs/2/1a70b4f0170611edbdd8b5d28d859895/MAFIA3-1729250602119.png?mode=crop&crop=faces&ar=2%3A1&format=auto&w=1200&q=75',
      title: 'PayPal Mafia',
      content: `Who is the PayPal Mafia? In 1998, a trio of visionaries—Max Levchin, Peter Thiel, and Luke Nosek—launched Fieldlink, which would soon be reborn as Confinity. Initially, their sights were set on developing cutting-edge security software for handheld devices. But as the digital landscape evolved, so did they, transforming into a pioneering digital wallet that would ultimately revolutionise online payments. The game changed dramatically when Confinity merged with X.com, a venture by Ed Ho, Elon Musk, Harris Fricker, and Christopher Payne.
      
      Who is the PayPal Mafia? In 1998, a trio of visionaries—Max Levchin, Peter Thiel, and Luke Nosek—launched Fieldlink, which would soon be reborn as Confinity. Initially, their sights were set on developing cutting-edge security software for handheld devices. But as the digital landscape evolved, so did they, transforming into a pioneering digital wallet that would ultimately revolutionise online payments. The game changed dramatically when Confinity merged with X.com, a venture by Ed Ho, Elon Musk, Harris Fricker, and Christopher Payne.`,
      author: 'Lana Del Rey',
      date: 'Nov 29, 2024',
    },
    {
      id:4,
      image: 'https://crypto.news/app/uploads/2024/11/crypto-news-ban-cryptocurrency-mining-in-the-Russian-occupied-regions-of-Ukraine-option02-1380x820.webp',
      title: 'Crypto',
      content: `In the early days of crypto, mining felt like an adventure for many, a hands-on way to dive in and start earning. Since this is a complex process that requires expensive and energy-intensive equipment, crypto mining on phones is becoming increasingly popular. In this article, we'll take a look at free mining and figure out which new free mining cryptocurrency is the best pick.

      In the early days of crypto, mining felt like an adventure for many, a hands-on way to dive in and start earning. Since this is a complex process that requires expensive and energy-intensive equipment, crypto mining on phones is becoming increasingly popular. In this article, we'll take a look at free mining and figure out which new free mining cryptocurrency is the best pick.`,
      author: 'Lana Del Rey',
      date: 'Nov 29, 2024',
    },
    {
      id:5,
      image: 'https://bsmedia.business-standard.com/_media/bs/img/article/2024-11/17/full/1731865030-5146.jpg?im=FeatureCrop,size=(803,452)',
      title: 'Share Market',
      content: `Though benchmark indices concluded on a flattish trend, Indian broader indices displayed optimism as the RBI acknowledged the downward growth trend while last-mile inflation persisted. By lowering the CRR and injecting ₹1.16 lakh crore into the financial system, the RBI aims to stimulate economic growth amid increased liquidity. The overall market exhibited a mixed outlook, reflecting a cautious yet resilient stance, with sector rotation and specific stock movements shaping market sentiment.

      Though benchmark indices concluded on a flattish trend, Indian broader indices displayed optimism as the RBI acknowledged the downward growth trend while last-mile inflation persisted. By lowering the CRR and injecting ₹1.16 lakh crore into the financial system, the RBI aims to stimulate economic growth amid increased liquidity. The overall market exhibited a mixed outlook, reflecting a cautious yet resilient stance, with sector rotation and specific stock movements shaping market sentiment.`,
      author: 'Daniel Radcliffe',
      date: 'Nov 29, 2024',
    },
    {
      id:6,
      image: 'https://bsmedia.business-standard.com/_media/bs/img/article/2024-03/18/full/1710780194-4451.jpg?im=FitAndFill=(826,465)',
      title: 'Blinkit vs Instamart: Chasing a moving target in quick commerce race',
      content: `Competition in the fast-growing quick commerce sector is heating up as Swiggy Instamart faces a tough challenge in narrowing the gap with Blinkit, which currently dominates the market.
      
      In the second quarter (Q2) of 2024-25 (FY25), Instamart's gross order value (GOV) rose by 42.1 per cent quarter-on-quarter (Q-o-Q) and 75.5 per cent year-on-year (Y-o-Y), reaching Rs 3,382 crore. Its adjusted earnings before interest, tax, depreciation, and amortisation (Ebitda) margin improved to minus 10.6 per cent, compared to minus 18.1 per cent Y-o-Y.
 
      In contrast, Blinkit reported a GOV of Rs 6,132 crore for the same period, showing 5 per cent Q-o-Q and 122 per cent Y-o-Y growth, despite operating at a larger scale. Blinkit has been contribution-positive since Q2 of 2023-24, while Instamart's contribution margin stood at minus 1.9 per cent of GOV in Q2FY25.

      Instamart's GOV growth has not led to sizeable margin gains, as higher marketing and employee expenses offset improvements from reduced contribution margin losses. Analysts note that while Swiggy's dark store network is seeing improved order density, Blinkit has achieved better unit economics at a comparable scale.`,
      author:`Krish Shaw`,
      date: 'Nov 29, 2024',
    },
  ];
  return (
    <div id='blogs'>
      <div className='flex justify-center gap-3'>
      <h1 className='text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-6'>Our</h1>
      <h1 className='text-pink-500 text-4xl sm:text-5xl md:text-6xl font-bold mb-6'>Blogs</h1>
      </div>
      <div className="container mx-auto p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          id={blog.id}
          image={blog.image}
          title={blog.title}
          content={blog.content}
          author={blog.author}
          date={blog.date}
        />
      ))}
      </div>
    </div>
  )
}

export default BlogList