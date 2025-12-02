from django.core.management.base import BaseCommand
from datetime import date
from ...models.purchase_model import Purchase
from ...constants.commands_constants import (
    MODE_CLEAR,
    MODE_REFRESH
)
from ...utils.date_utils import generate_random_date_string
import random
import logging

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Seeds database for testing and development"

    def add_arguments(self, parser) -> None:
        parser.add_argument("--mode", type=str, help="Mode")

    def handle(self, *args, **options) -> None:
        self.stdout.write("Seeding data...")
        run_seed(self, options["mode"])
        self.stdout.write("done.")


def clear_data() -> None:
    """Deletes all the table data"""
    logger.info("Delete Address instances")
    Purchase.objects.all().delete()


def create_purchase() -> Purchase:
    """Creates a purchase object"""
    logger.info("Creating purchase...")

    categories = ["Sneakers", "T-shirts", "Shoes",
                  "Accessories", "Pants", "Sweatshirts"]

    # Create a random date string for sometime between today
    # and 1 year ago.
    date_string = generate_random_date_string()
    purchase = Purchase(
        category=random.choice(categories),
        amount=round(random.uniform(15.0, 250.0), 2),
        timestamp=date.fromisoformat(date_string),
    )

    try:
        purchase.save()
    except Exception as e:
        logger.error(e)
        return purchase

    logger.info(f"{str(purchase)} created.")

    return purchase


def run_seed(self, mode: str = MODE_REFRESH) -> None:
    """ Seed database based on mode
    """
    # Clear data from tables
    clear_data()

    if mode == MODE_CLEAR:
        return

    # Create sample size of 1000 purchases
    for i in range(1000):
        create_purchase()
