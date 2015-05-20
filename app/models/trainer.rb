class Trainer < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         #:confirmable

  #Associations
  has_and_belongs_to_many :badges, :join_table => 'trainers_badges'

  has_many :huntstates
  has_many :pokemons, through: :huntstates

  #Validation
  validates_uniqueness_of :login
end
