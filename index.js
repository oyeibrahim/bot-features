/**Environment */
require('dotenv').config();

/**Telegraf */
const { Telegraf, Extra, Markup } = require('telegraf')

/**Add bot token */
//process.env.BOT_TOKEN is the bot token, get it from BotFather
const bot = new Telegraf(process.env.BOT_TOKEN)



//---------------------------------------- NORMAL COMMANDS
//----------------------------------------------------------------------------------------------//

/**
 * START
 */
bot.start(async (ctx) => {

    //ctx.chat contains all user info
    //chat ID
    let chat_id = ctx.chat.id;
    //firstname
    let firstname = ctx.chat.first_name;
    //lastname
    let lastname = ctx.chat.last_name;
    //username
    let username = ctx.chat.username;

    //To get referral code (if any)
    //Example Referral link : https://t.me/botusername?start=refCode
    let t_req = "";
    let ref_code = "";
    if (ctx.message.text.length > 6) {
        t_req = ctx.message.text
        ref_code = t_req.substring(t_req.indexOf(" ") + 1);
    }

    //ref_code now contains the referral code

    let reply = "Bot Started, <b>Welcome " + username + "</b>"

    //reply with the reply message above //parse as HTML
    ctx.telegram.sendMessage(ctx.chat.id, reply, { parse_mode: "HTML" })

}).catch((err, ctx) => {
    console.log('Ooops, encountered an error')
})



/**
 * HELP
 */
bot.help(async (ctx) => {

    let reply = "Help command detected"

    //reply with the reply message above //parse as HTML
    ctx.telegram.sendMessage(ctx.chat.id, reply, { parse_mode: "HTML" })

}).catch((err, ctx) => {
    console.log('Ooops, encountered an error')
})



//----------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------//







//---------------------------------------- CUSTOM COMMANDS AND INLINE KEYBOARDS
//----------------------------------------------------------------------------------------------//
//command is like "/command"

/**
 * Inline Keyboard Examples
 */
bot.command('ikeyboard1', (ctx) => {

    let reply = "Here is an example One Inline Keyboard"

    ctx.telegram.sendMessage(ctx.chat.id, reply,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "SydeWalKa Site",
                            url: "https://sydewalka.com"
                        }
                    ]
                ]
            }
        }
    )

}).catch((err, ctx) => {
    console.log('Ooops, encountered an error')
})


bot.command('ikeyboard2', (ctx) => {

    let reply = "Here is an example Two Inline Keyboards on one row"

    ctx.telegram.sendMessage(ctx.chat.id, reply,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "SydeWalKa",
                            url: "https://sydewalka.com"
                        },
                        {
                            text: "SydeWalKa",
                            url: "https://sydewalka.com"
                        },
                    ]
                ]
            }
        }
    )

}).catch((err, ctx) => {
    console.log('Ooops, encountered an error')
})


bot.command('ikeyboard3', (ctx) => {

    let reply = "Here is an example Three Inline Keyboards with different rows"

    ctx.telegram.sendMessage(ctx.chat.id, reply,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "SydeWalKa",
                            url: "https://sydewalka.com"
                        }
                    ],
                    [
                        {
                            text: "SydeWalKa",
                            url: "https://sydewalka.com"
                        },
                        {
                            text: "SydeWalKa",
                            url: "https://sydewalka.com"
                        },
                    ]
                ]
            }
        }
    )

}).catch((err, ctx) => {
    console.log('Ooops, encountered an error')
})

//----------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------//






//---------------------------------------- CUSTOM COMMANDS AND NORMAL KEYBOARDS
//----------------------------------------------------------------------------------------------//
/**
 * Normal Keyboard Examples
 */
bot.command('nkeyboard1', (ctx) => {

    let reply = "Here is an example One Normal Keyboard"

    ctx.telegram.sendMessage(ctx.chat.id, reply, {
        parse_mode: "HTML",
        reply_markup: {
            keyboard: [
                [
                    {
                        text: "Test1",
                    }
                ]
            ],
            resize_keyboard: true
        }
    })

}).catch((err, ctx) => {
    console.log('Ooops, encountered an error')
})


bot.command('nkeyboard2', (ctx) => {

    let reply = "Here is an example Two Normal Keyboards on one row"

    ctx.telegram.sendMessage(ctx.chat.id, reply, {
        parse_mode: "HTML",
        reply_markup: {
            keyboard: [
                [
                    {
                        text: "Test1",
                    },
                    {
                        text: "Test2",
                    }
                ]
            ],
            resize_keyboard: true
        }
    })

}).catch((err, ctx) => {
    console.log('Ooops, encountered an error')
})


bot.command('nkeyboard3', (ctx) => {

    let reply = "Here is an example Three Normal Keyboards with different rows"

    ctx.telegram.sendMessage(ctx.chat.id, reply, {
        parse_mode: "HTML",
        reply_markup: {
            keyboard: [
                [
                    {
                        text: "Test1",
                    }
                ],
                [
                    {
                        text: "Test2",
                    },
                    {
                        text: "Test3",
                    }
                ]
            ],
            resize_keyboard: true
        }
    })

}).catch((err, ctx) => {
    console.log('Ooops, encountered an error')
})

//----------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------//





//---------------------------------------- INLINE KEYBOARDS WITH CALLBACK
//----------------------------------------------------------------------------------------------//
/**
 * Using callback with inline keyboard
 */
bot.command('ikeyboardc', (ctx) => {

    let reply = "Clicking this button will carry out another telegram task and not take you to an external link."
        + " The First button will just return a message. The second button will return a message, delete previous button"
        + " and give an option to go back to previous button"

    ctx.telegram.sendMessage(ctx.chat.id, reply,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "First",
                            callback_data: "NonDeleteTest"
                        },
                        {
                            text: "Second",
                            callback_data: "DeleteTest"
                        }
                    ]
                ]
            }
        }
    )

}).catch((err, ctx) => {
    console.log('Ooops, encountered an error')
})

//the above First inline keyboard will callback this data
bot.action('NonDeleteTest', (ctx) => {

    let reply = "Data Callback Successful, Buttons Still remain"

    ctx.telegram.sendMessage(ctx.chat.id, reply, { parse_mode: "HTML" })

}).catch((err, ctx) => {
    console.log('Ooops, encountered an error')
})

//the above Second inline keyboard will callback this data
bot.action('DeleteTest', (ctx) => {

    ctx.deleteMessage();

    let reply = "Data Callback Successful, Buttons Deleted and a Back to previous buttons shows"

    ctx.telegram.sendMessage(ctx.chat.id, reply,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "Go Back",
                            callback_data: "go-back"
                        }
                    ]
                ]
            }
        }
    )

}).catch((err, ctx) => {
    console.log('Ooops, encountered an error')
})

//Just to return to the /ikeyboardc menu
bot.action('go-back', (ctx) => {

    let reply = "Clicking this button will carry out another telegram task and not take you to an external link."
        + " The First button will just return a message. The second button will return a message, delete previous button"
        + " and give an option to go back to previous button"

    ctx.telegram.sendMessage(ctx.chat.id, reply,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "First",
                            callback_data: "NonDeleteTest"
                        },
                        {
                            text: "Second",
                            callback_data: "DeleteTest"
                        }
                    ]
                ]
            }
        }
    )

}).catch((err, ctx) => {
    console.log('Ooops, encountered an error')
})

//----------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------//






//---------------------------------------- INLINE KEYBOARDS WITH CALLBACK
//----------------------------------------------------------------------------------------------//

/**
 * hears is just the request sent in plain text. below method handles sending just "hello"
 */
bot.hears('hello', async (ctx) => {

    let reply = "Hi <b>" + username + "</b>. Thanks for sending hello in plain text"

    ctx.telegram.sendMessage(ctx.chat.id, reply, { parse_mode: "HTML" })

}).catch((err, ctx) => {
    console.log('Ooops, encountered an error')
})

//----------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------//






//---------------------------------------- SENDING FILE
//----------------------------------------------------------------------------------------------//

/**
 * lets use command to send files
 */
bot.command('photo', async (ctx) => {

    //optional for displaying a message to user for something going on before the file arrives
    ctx.telegram.sendChatAction(ctx.chat.id, "upload_photo")

    //reply_to_message_id is optional. It is used to make the bot quote the original message
    ctx.telegram.sendPhoto(ctx.chat.id,
        { source: "files/sydewalka_logo.png" },
        { "reply_to_message_id": ctx.message.message_id }
    )

}).catch((err, ctx) => {
    console.log('Ooops, encountered an error')
})



//we can also send a photo using its url
bot.command('onlinephoto', async (ctx) => {

    //optional for displaying a message to user for something going on before the file arrives
    ctx.telegram.sendChatAction(ctx.chat.id, "upload_photo")

    //reply_to_message_id is optional. It is used to make the bot quote the original message
    ctx.telegram.sendPhoto(ctx.chat.id,
        "https://sydewalka.com/upload/settings/de0eaeb9eab5b59cb0523a8e90137883.png",
        { "reply_to_message_id": ctx.message.message_id }
    )

}).catch((err, ctx) => {
    console.log('Ooops, encountered an error')
})



//we can also send using its telegram id
//an id is generated for every file sent on telegram, we can get id of a photo by using
//bot.on("photo") as in the ON (NORMAL ACTIONS) below and loggin its id
bot.command('telegramidphoto', async (ctx) => {

    //optional for displaying a message to user for something going on before the file arrives
    ctx.telegram.sendChatAction(ctx.chat.id, "upload_photo")

    //reply_to_message_id is optional. It is used to make the bot quote the original message
    ctx.telegram.sendPhoto(ctx.chat.id,
        "telegram photo id here",
        { "reply_to_message_id": ctx.message.message_id }
    )

}).catch((err, ctx) => {
    console.log('Ooops, encountered an error')
})


//send multiple photos at once
bot.command('photos', async (ctx) => {

    //optional for displaying a message to user for something going on before the file arrives
    ctx.telegram.sendChatAction(ctx.chat.id, "upload_photo")

    //reply_to_message_id is optional. It is used to make the bot quote the original message
    ctx.telegram.sendMediaGroup(ctx.chat.id,
        [
            {
                type: "photo",
                media: {
                    source: "files/sydewalka_logo.png"
                }
            },
            {
                type: "photo",
                media: {
                    source: "files/sydewalka_logo2.png"
                }
            },
            {
                type: "photo",
                media: {
                    source: "files/sydewalka_logo3.png"
                }
            }
        ]
    )

}).catch((err, ctx) => {
    console.log('Ooops, encountered an error')
})



//Send gif
bot.command('gif', async (ctx) => {

    //optional for displaying a message to user for something going on before the file arrives
    ctx.telegram.sendChatAction(ctx.chat.id, "upload_photo")

    //reply_to_message_id is optional. It is used to make the bot quote the original message
    ctx.telegram.sendAnimation(ctx.chat.id,
        { source: "files/sydewalka_love.gif" },
        { "reply_to_message_id": ctx.message.message_id }
    )

}).catch((err, ctx) => {
    console.log('Ooops, encountered an error')
})



//send location using latitude and longitude
bot.command('osogbo', async (ctx) => {

    //set latitude (first) and longitude (second)
    ctx.telegram.sendLocation(ctx.chat.id, 7.7827, 4.5418);

}).catch((err, ctx) => {
    console.log('Ooops, encountered an error')
})


//----------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------//







//---------------------------------------- ON (NORMAL ACTIONS)
//----------------------------------------------------------------------------------------------//
/**
 * When user send sticker
 */
bot.on('sticker', (ctx) => {

    let username = ctx.chat.username;

    let reply = "Sticker seen, <b>Cool one " + username + "</b>"

    ctx.telegram.sendMessage(ctx.chat.id, reply, { parse_mode: "HTML" })

}).catch((err, ctx) => {
    console.log('Ooops, encountered an error')
})


/**
 * When user send photo
 */
bot.on('photo', (ctx) => {

    //ctx contains all info //we can get the id of the photo from it
    let all_info = ctx; console.log(ctx)

    let username = ctx.chat.username;

    let reply = "Photo seen, <b>Cool one " + username + "</b>"

    ctx.telegram.sendMessage(ctx.chat.id, reply, { parse_mode: "HTML" })

}).catch((err, ctx) => {
    console.log(err)
})

//----------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------//







//Start bot
bot.launch();

console.log("App Started!!!");