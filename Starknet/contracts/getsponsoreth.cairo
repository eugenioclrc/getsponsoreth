
# SPDX-License-Identifier: MIT
# OpenZeppelin Contracts for Cairo v0.1.0 (token/erc721_enumerable/ERC721_Enumerable_Mintable_Burnable.cairo)

%lang starknet
from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin
from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.math import assert_not_zero, assert_le, assert_nn, assert_nn_le, assert_lt
from starkware.starknet.common.syscalls import (
    get_contract_address, get_caller_address
)
from starkware.cairo.common.uint256 import (
    Uint256, uint256_add, uint256_sub, uint256_mul, uint256_le, uint256_lt, uint256_check, uint256_eq, uint256_neg
)

from starkware.starknet.common.syscalls import (
    get_block_number
)
from openzeppelin.token.erc20.interfaces.IERC20 import IERC20

from openzeppelin.token.erc721.library import (
    ERC721_name,
    ERC721_symbol,
    ERC721_balanceOf,
    ERC721_ownerOf,
    ERC721_getApproved,
    ERC721_isApprovedForAll,
    ERC721_tokenURI,

    ERC721_initializer,
    ERC721_approve, 
    ERC721_setApprovalForAll,
    ERC721_only_token_owner,
    ERC721_setTokenURI
)

from openzeppelin.token.erc721_enumerable.library import (
    ERC721_Enumerable_initializer,
    ERC721_Enumerable_totalSupply,
    ERC721_Enumerable_tokenByIndex,
    ERC721_Enumerable_tokenOfOwnerByIndex,
    ERC721_Enumerable_mint,
    ERC721_Enumerable_burn,
    ERC721_Enumerable_transferFrom,
    ERC721_Enumerable_safeTransferFrom
)

#from openzeppelin.introspection.ERC165 import ERC165



####################
# STRUCTS
####################



####################
# EVENTS
####################

@event
func sponsor_created(sponsor_id: felt, owner: felt):
end

@event
func sponsorship_funder(sponsor_id: felt, owner: felt, funder: felt, amount:Uint256):
end



####################
# STORAGE VARIABLES
####################

@storage_var
func payment_token() -> (res: felt):
end

@storage_var
func owner_of(id: felt) -> (res: felt):
end

@storage_var
func counter() -> (res: felt):
end



####################
# VIEW FUNCTIONS
####################

@view
func view_payment_token{
        syscall_ptr : felt*,
        pedersen_ptr : HashBuiltin*,
        range_check_ptr
    }() -> (res: felt):
    let (result) = payment_token.read()
    return (result)
end

@view
func view_count{
        syscall_ptr : felt*,
        pedersen_ptr : HashBuiltin*,
        range_check_ptr
    }() -> (res: felt):
    let (result) = counter.read()
    return (result)
end

@view
func view_owner_of{
        syscall_ptr : felt*,
        pedersen_ptr : HashBuiltin*,
        range_check_ptr
    }(id: felt) -> (res: felt):
    let (result) = owner_of.read(id)
    return (result)
end


####################
# CONSTRUCTOR
####################

@constructor
func constructor{
        syscall_ptr: felt*, 
        pedersen_ptr: HashBuiltin*,
        range_check_ptr
        
    }(  
        
        _payment_token: felt,
        name: felt,
        symbol: felt,
    ):
    #alloc_locals 

    #check parment_token not zero
    assert_not_zero(_payment_token)
    payment_token.write(_payment_token)
    counter.write(1)
    ERC721_initializer(name, symbol)
    ERC721_Enumerable_initializer()


    return ()
end



####################
# EXTERNAL FUNCTIONS
####################

# @notice create a sponsor 
@external
func create_sponsor{
        syscall_ptr : felt*,
        pedersen_ptr : HashBuiltin*,
        range_check_ptr
    }():
    alloc_locals
    let (sender_address) = get_caller_address()
    let (current_counter) = counter.read()
    owner_of.write(current_counter, sender_address)
    sponsor_created.emit(current_counter, sender_address)
    counter.write(current_counter + 1)
    return()
end

# @notice funds a sponsorship
@external
func fund{
        syscall_ptr : felt*,
        pedersen_ptr : HashBuiltin*,
        range_check_ptr
    }(sponsorId: felt, amount: Uint256):
    alloc_locals
    let (sender) = get_caller_address()
    let (owner) = owner_of.read(sponsorId)
    let (token) = payment_token.read()
    assert_not_zero(owner)
    IERC20.transferFrom(contract_address=token,sender=sender,recipient=owner, amount=amount)
    sponsorship_funder.emit(sponsorId,owner,sender,amount)
    let (total) = totalSupply()
    let one : Uint256 = Uint256(1,0)
    let tokenId: Uint256 = uint256_add(total, one)
    ERC721_Enumerable_mint(sender, tokenId)
    return()
end



#
# Getters
#

@view
func totalSupply{
        pedersen_ptr: HashBuiltin*, 
        syscall_ptr: felt*, 
        range_check_ptr
    }() -> (totalSupply: Uint256):
    let (totalSupply: Uint256) = ERC721_Enumerable_totalSupply()
    return (totalSupply)
end

@view
func tokenByIndex{
        pedersen_ptr: HashBuiltin*, 
        syscall_ptr: felt*, 
        range_check_ptr
    }(index: Uint256) -> (tokenId: Uint256):
    let (tokenId: Uint256) = ERC721_Enumerable_tokenByIndex(index)
    return (tokenId)
end

@view
func tokenOfOwnerByIndex{
        pedersen_ptr: HashBuiltin*, 
        syscall_ptr: felt*, 
        range_check_ptr
    }(owner: felt, index: Uint256) -> (tokenId: Uint256):
    let (tokenId: Uint256) = ERC721_Enumerable_tokenOfOwnerByIndex(owner, index)
    return (tokenId)
end



@view
func name{
        syscall_ptr : felt*,
        pedersen_ptr : HashBuiltin*,
        range_check_ptr
    }() -> (name: felt):
    let (name) = ERC721_name()
    return (name)
end

@view
func symbol{
        syscall_ptr : felt*,
        pedersen_ptr : HashBuiltin*,
        range_check_ptr
    }() -> (symbol: felt):
    let (symbol) = ERC721_symbol()
    return (symbol)
end

@view
func balanceOf{
        syscall_ptr : felt*, 
        pedersen_ptr : HashBuiltin*,
        range_check_ptr
    }(owner: felt) -> (balance: Uint256):
    let (balance: Uint256) = ERC721_balanceOf(owner)
    return (balance)
end

@view
func ownerOf{
        syscall_ptr : felt*, 
        pedersen_ptr : HashBuiltin*,
        range_check_ptr
    }(tokenId: Uint256) -> (owner: felt):
    let (owner: felt) = ERC721_ownerOf(tokenId)
    return (owner)
end

@view
func getApproved{
        syscall_ptr : felt*, 
        pedersen_ptr : HashBuiltin*,
        range_check_ptr
    }(tokenId: Uint256) -> (approved: felt):
    let (approved: felt) = ERC721_getApproved(tokenId)
    return (approved)
end

@view
func isApprovedForAll{
        syscall_ptr : felt*, 
        pedersen_ptr : HashBuiltin*,
        range_check_ptr
    }(owner: felt, operator: felt) -> (isApproved: felt):
    let (isApproved: felt) = ERC721_isApprovedForAll(owner, operator)
    return (isApproved)
end

@view
func tokenURI{
        syscall_ptr: felt*, 
        pedersen_ptr: HashBuiltin*, 
        range_check_ptr
    }(tokenId: Uint256) -> (tokenURI: felt):
    let (tokenURI: felt) = ERC721_tokenURI(tokenId)
    return (tokenURI)
end

#
# Externals
#

@external
func approve{
        pedersen_ptr: HashBuiltin*, 
        syscall_ptr: felt*, 
        range_check_ptr
    }(to: felt, tokenId: Uint256):
    ERC721_approve(to, tokenId)
    return ()
end

@external
func setApprovalForAll{
        syscall_ptr: felt*, 
        pedersen_ptr: HashBuiltin*, 
        range_check_ptr
    }(operator: felt, approved: felt):
    ERC721_setApprovalForAll(operator, approved)
    return ()
end

@external
func transferFrom{
        pedersen_ptr: HashBuiltin*, 
        syscall_ptr: felt*, 
        range_check_ptr
    }(
        from_: felt, 
        to: felt, 
        tokenId: Uint256
    ):
    ERC721_Enumerable_transferFrom(from_, to, tokenId)
    return ()
end

@external
func safeTransferFrom{
        pedersen_ptr: HashBuiltin*, 
        syscall_ptr: felt*, 
        range_check_ptr
    }(
        from_: felt, 
        to: felt, 
        tokenId: Uint256, 
        data_len: felt,
        data: felt*
    ):
    ERC721_Enumerable_safeTransferFrom(from_, to, tokenId, data_len, data)
    return ()
end


@external
func burn{
        pedersen_ptr: HashBuiltin*, 
        syscall_ptr: felt*, 
        range_check_ptr
    }(tokenId: Uint256):
    ERC721_only_token_owner(tokenId)
    ERC721_Enumerable_burn(tokenId)
    return ()
end

