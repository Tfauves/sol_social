use anchor_lang::prelude::*;
use std::mem::size_of;


#[derive(Accounts)]
pub struct UpdateStatus<'info> {
    
    pub user: Signer<'info>,

    #[account(mut, seeds = [b"new_user_account".as_ref(), user.key().as_ref()], bump)]
    pub user_account: Box<Account<'info, User>>

}

#[derive(Accounts)]
pub struct SendPost<'info> {
    
    #[account(init, payer = author, space = size_of::<Post>())]
    pub post: Box<Account<'info, Post>>,

    #[account(mut)]
    pub author: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Post {
    pub author: Pubkey,
    pub timestamp: i64,
    pub content: String,
    pub username: String,

}

#[derive(Accounts)]
pub struct AddBookmarks<'info> {
    
    pub user: Signer<'info>,
    
    #[account(mut, seeds = [b"new_user_account".as_ref(), user.key().as_ref()], bump)]
    pub user_account: Box<Account<'info, User>>,

}


#[derive(Accounts)]
pub struct UpdateUsername<'info> {
    
    pub user: Signer<'info>,
    
    #[account(mut, seeds = [b"new_user_account".as_ref(), user.key().as_ref()], bump)]
    pub user_account: Box<Account<'info, User>>,
   
}

#[derive(Accounts)]
pub struct NewUser<'info> {
    
    #[account(mut)]
    pub user: Signer<'info>,
    
    #[account(
        init, 
        payer = user, 
        space = size_of::<User>(), 
        seeds = [b"new_user_account".as_ref(), user.key().as_ref()], 
        bump
    )]
    pub user_account: Box<Account<'info, User>>,
    
    pub system_program: Program<'info, System>,
}

#[account]
pub struct User {
    pub user: Pubkey,
    pub username: String,
    pub timestamp: i64,
    pub bookmarks: Vec<u32>,
    pub status: String
}


