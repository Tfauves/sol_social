use anchor_lang::prelude::*;
use account::*;
mod account;

declare_id!("7CuooyeTewXB5v3V22gmkoZFKDBdFmkb68mhozGghcxt");

#[program]
pub mod sol_social {
    use super::*;

    pub fn new_user(ctx: Context<NewUser>, username: String, status: String) -> Result<()> {
        let user_account = &mut ctx.accounts.user_account;
        let clock: Clock = Clock::get().unwrap();

        user_account.username = username;

        if status.chars().count() > 100 {
            msg!("status may not contain than 100 characters")
        }
        user_account.status = status;

        user_account.timestamp = clock.unix_timestamp;
        user_account.bookmarks = Vec::new();
        Ok(())
    }

    pub fn update_username(ctx: Context<UpdateUsername>, username: String) -> Result<()> {
        let user_account = &mut ctx.accounts.user_account;
        if username.chars().count() > 280 {
            msg!("Name must be less than 280 characters!");
        }
        user_account.username = username;
        Ok(())
    }

    pub fn update_status(ctx: Context<UpdateStatus>, status: String) -> Result<()> {
        let user_account = &mut ctx.accounts.user_account;
        if status.chars().count() > 100 {
            msg!("status may not contain more than 100 characters")
        }
        user_account.status = status;
        Ok(())
    }

    // pub fn add_bookmarks(ctx: Context<AddBookmarks>, bookmark: String) -> Result<()> {
    //     let user_account = &mut ctx.accounts.user_account;

    //     if user_account.bookmarks.contains(&bookmark) {
    //         msg!("bookmark already saved!")
    //     } else {
    //         user_account.bookmarks.push(bookmark);
    //     }
    //     Ok(())
    // }

    // pub fn send_post(ctx: Context<SendPost>, content: String, username: String,) -> Result<()> {
    //     let post: &mut Account<Post> = &mut ctx.accounts.post;
    //     let author: &Signer = &ctx.accounts.author;

    //     if content.chars().count() > 280 {
    //         msg!("content must by less the 280 characters!");
    //     }

    //     post.author = *author.key;
    //     post.content = content;
    //     post.username = username;

    //     Ok(())
    // }
}

